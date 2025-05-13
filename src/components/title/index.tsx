interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <div className="flex justify-center items-center h-40">
      <h1 className=" font-bold text-4xl">{title}</h1>
    </div>
  );
}
