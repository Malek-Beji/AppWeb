"use client";

export default function DeleteButton({
  label = "Supprimer",
  confirmText = "Confirmer la suppression ?",
  className,
}: {
  label?: string;
  confirmText?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      {label}
    </button>
  );
}
