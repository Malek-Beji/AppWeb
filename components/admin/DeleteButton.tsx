"use client";

export default function DeleteButton({
  label = "Supprimer",
  confirmText = "Confirmer la suppression ?",
  className,
  title,
  children,
}: {
  label?: string;
  confirmText?: string;
  className?: string;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      title={title}
      onClick={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      {children ?? label}
    </button>
  );
}
