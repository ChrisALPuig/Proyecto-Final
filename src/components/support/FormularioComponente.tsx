import { IonPage } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SupportHeader from "./SupportHeader.tsx";
import "./FormularioComponente.css";

const FormularioComponente: React.FC = () => {

  const history = useHistory();

  // Estados
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [attachmentError, setAttachmentError] = useState("");

  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArr = Array.from(files);
    const validFiles = fileArr.filter((file) => allowedImageTypes.includes(file.type));
    const invalidFiles = fileArr.filter((file) => !allowedImageTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setAttachmentError("Solo se permiten imágenes (jpeg, png, gif, webp).");
    } else {
      setAttachmentError("");
    }

    if (validFiles.length > 0) {
      const newAttachments = [...attachments, ...validFiles].slice(0, 5); // Opcional: límite 5 archivos
      setAttachments(newAttachments);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") resolve(result);
        else reject(new Error("Error al leer la imagen"));
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Enviar formulario
  const handleSubmit = async () => {
    let attachmentData: string[] = [];

    try {
      attachmentData = await Promise.all(attachments.map((file) => readFileAsBase64(file)));
    } catch (readError) {
      console.error(readError);
      alert("Error al procesar los archivos adjuntos");
      return;
    }

    const data = {
      email,
      orderId,
      subject,
      description,
      attachments: attachmentData
    };

    try {
      const response = await fetch("http://localhost:8080/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Error al enviar");
      }

      alert("Solicitud enviada correctamente");

      // Redirigir
      history.push("/confirmacion");

    } catch (error) {
      console.error(error);
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <>
      <SupportHeader />

      <div className="support-content">
        <div className="support-grid">

          <div className="support-item">
            <img
              src="/1.png"
              alt="ORDERS_PAYMENTS"
              className="support-img"
              onClick={() => window.location.href = "/orders-payments"}
            />
            <h5>ORDERS & PAYMENTS</h5>
            <p>Are you having trouble making purchase?</p>
          </div>

          <div className="support-item">
            <img src="/2.png" alt="ACCOUNT_STORE" className="support-img"/>
            <h5>ACCOUNT & STORE</h5>
            <p>Are you having issues with accessing your account or the store itself?</p>
          </div>

          <div className="support-item">
            <img src="/3.png" alt="POLICIES_GENERAL_INFO" className="support-img"/>
            <h5>POLICIES & GENERAL INFO</h5>
            <p>Here you can read our policies, or learn more about our service</p>
          </div>

        </div>

        <div className="title-contact">
          <h1 className="title-contact-uno">Submit a request</h1>
        </div>

        <div className="p-contact">
          <p>
            Please outline your issue here. Someone from our friendly and 
            knowledgeable <br />staff will be with you as soon as possible 
            (typically within 24 hours).
          </p>
        </div>

        <div className="contact">
          <div className="p-form">

            <p className="form-label">Your email address *</p>
            <input 
              type="text"
              className="inputs-form"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="p-form-1">
              <p className="form-label">Order ID</p>
              <input
                type="text"
                className="inputs-form-1"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>

            <div className="p-form-2">
              <p className="form-label">Subject*</p>
              <input 
                type="text"
                className="inputs-form-2"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="p-form-3">
              <p className="form-label">Description*</p>
              <input 
                type="text"
                className="inputs-form-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="p-form-4">
              <p className="form-label">Attachments</p>

              <div
                className={`attachment-zone ${dragActive ? "drag-active" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p>
                  Arrastra y suelta imágenes aquí, o haz clic para seleccionar
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="attachment-input"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {attachmentError && (
                <p className="attachment-error">{attachmentError}</p>
              )}

              {attachments.length > 0 && (
                <div className="attachment-preview-grid">
                  {attachments.map((file, index) => (
                    <div className="attachment-preview" key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="attachment-thumb"
                      />
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="attachment-remove"
                        onClick={() => removeAttachment(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="mover-boton">
            <button 
              className="contact-boton-dos"
              onClick={handleSubmit}
            >
              SEND
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default FormularioComponente;