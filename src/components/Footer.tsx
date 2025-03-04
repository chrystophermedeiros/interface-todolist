import packageJson from "../../package.json";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4 bg-background-primary text-color-black">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Todolist. Todos os direitos
        reservados.
      </p>
      <p className="text-xs text-color-green-forest">Versão {packageJson.version}</p>
    </footer>
  );
};
