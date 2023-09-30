import {
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";

import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { toBlob } from "html-to-image";
import useStore from "../../store";
import { toPng } from "html-to-image";
import { toSvg } from "html-to-image";

export default function ExportOptions({ targetRef }) {
  const title = useStore(state => state.title)

  const copyImage = async () => {
    const imgBlob = await toBlob(targetRef.current, {
      pixelRatio: 2,
    });
    const img = new ClipboardItem({ "image/png": imgBlob });
    navigator.clipboard.write([img]);
  };

  const copyLink = () => {
    const state = useStore.getState();
    const queryParams = new URLSearchParams({
      ...state,
      code: btoa(state.code),
    }).toString();
    navigator.clipboard.writeText(`${location.href}?${queryParams}`);
  };

  const saveImage = async (name, format) => {
    let imgUrl, filename;

    switch (format) {
      case "PNG":
        imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
        filename = `${name}.png`;
        break;
      case "SVG":
        imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
        filename = `${name}.svg`;
        break;
      default:
        return;
    }
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = filename;
    a.click();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem
          className="gap-2 flex items-center"
          onClick={() =>
            toast.promise(copyImage(), {
              loading: "Copiando imagen...",
              success: "Imagen copiada",
              error: "Error al copiar la imagen",
            })
          }>
          <ImageIcon />
          Copiar Imagen
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 flex items-center"
          onClick={() => {
            copyLink();
            toast.success("Enlace copiado");
          }}>
          <Link2Icon />
          Copiar Enlace
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 flex items-center"
          onClick={() =>
            toast.promise(saveImage(title, "PNG"), {
              loading: "Guardando imagen en PNG...",
              success: "Imagen guardada en PNG",
              error: "Error guardar la imagen",
            })
          }>
          <DownloadIcon />
          Descargar como PNG
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 flex items-center"
         onClick={() =>
          toast.promise(saveImage(title, "SVG"), {
            loading: "Guardando imagen en SVG...",
            success: "Imagen guardada en SVG",
            error: "Error guardar la imagen",
          })
        }>
          <DownloadIcon />
          Descargar como SVG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
