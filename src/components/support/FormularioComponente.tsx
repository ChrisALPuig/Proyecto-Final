import { IonPage } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SupportHeader from "./SupportHeader.tsx";
import "./FormularioComponente.css";
import { useAuth } from "../../contexts/AuthContext.tsx";

const FormularioComponente: React.FC = () => {
  const history = useHistory();
  const { token } = useAuth();

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
    const validFiles = fileArr.filter(file => allowedImageTypes.includes(file.type));
    const invalidFiles = fileArr.filter(file => !allowedImageTypes.includes(file.type));

    if (invalidFiles.length > 0) setAttachmentError("Solo se permiten imágenes (jpeg, png, gif, webp).");
    else setAttachmentError("");

    if (validFiles.length > 0) {
      const newAttachments = [...attachments, ...validFiles].slice(0, 5);
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
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

 const handleSubmit = async () => {
  if (!token) {
    alert("No estás autenticado. Por favor haz login primero.");
    return;
  }

  if (!email || !subject || !description) {
    alert("Por favor completa los campos obligatorios: Email, Subject y Description");
    return;
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("orderId", orderId);
  formData.append("subject", subject);
  formData.append("description", description);

  attachments.forEach(file => formData.append("attachments", file));

  try {
    const response = await fetch("http://localhost:8080/api/tickets/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // No necesitamos la respuesta del ticket, solo confirmamos que se guardó
    if (response.ok) {
      alert("Ticket guardado correctamente en la base de datos.");
      
      // Limpiar formulario si quieres
      setEmail("");
      setOrderId("");
      setSubject("");
      setDescription("");
      setAttachments([]);
      setAttachmentError("");
    } else {
      const data = await response.json();
      alert(data.message || "Error al guardar el ticket");
    }
  } catch (error) {
    console.error("Error submit:", error);
    alert("No se pudo guardar el ticket. Intenta nuevamente.");
  }
};

  return (
    <>
      <SupportHeader />

      <div className="support-content">
        <div className="title-contact">
          <h1 className="title-contact-uno">Submit a request</h1>
        </div>

        <div className="contact">
          <div className="p-form">
            <p className="form-label">Your email address *</p>
            <input type="text" className="inputs-form" value={email} onChange={e => setEmail(e.target.value)} />

            <p className="form-label">Order ID</p>
            <input type="text" className="inputs-form-1" value={orderId} onChange={e => setOrderId(e.target.value)} />

            <p className="form-label">Subject *</p>
            <input type="text" className="inputs-form-2" value={subject} onChange={e => setSubject(e.target.value)} />

            <p className="form-label">Description *</p>
            <input type="text" className="inputs-form-3" value={description} onChange={e => setDescription(e.target.value)} />

            <p className="form-label">Attachments</p>
            <div
              className={`attachment-zone ${dragActive ? "drag-active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p>Arrastra y suelta imágenes aquí o haz clic para seleccionar</p>
              <input type="file" accept="image/*" multiple className="attachment-input" onChange={e => handleFiles(e.target.files)} />
            </div>

            {attachmentError && <p className="attachment-error">{attachmentError}</p>}

            {attachments.length > 0 && (
              <div className="attachment-preview-grid">
                {attachments.map((file, index) => (
                  <div className="attachment-preview" key={index}>
                    <img src={URL.createObjectURL(file)} alt={file.name} className="attachment-thumb" />
                    <span>{file.name}</span>
                    <button type="button" className="attachment-remove" onClick={() => removeAttachment(index)}>Eliminar</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mover-boton">
            <button className="contact-boton-dos" onClick={handleSubmit}>SEND</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioComponente;