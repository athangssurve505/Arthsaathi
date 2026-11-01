export default function ModalFooter({
  children,
}) {
  return (
    <div className="flex justify-end gap-3 border-t border-gray-200 p-6">
      {children}
    </div>
  );
}