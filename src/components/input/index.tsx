interface AddInputProps {
  nome: string;
  value: string;
  func: (valor: string) => void;
  placeholder: string;
}
export default function AddInput({
  nome,
  value,
  func,
  placeholder,
}: AddInputProps) {
  return (
    <label className="text-xl m-2 font-bold">
      {" "}
      {nome}:{" "}
      <input
        className="border pl-1 font-normal bg-white"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => func(e.target.value)}
      />
    </label>
  );
}
