import { enUS, ptBR } from "date-fns/locale";
import { format, parseISO } from "date-fns";

export function formatDate(
  date: string,
  customFormat?: string,
  locale: string = "pt-BR",
) {
  let dateFormat = locale !== "pt-BR" ? "MM-dd-yyyy HH:mm" : "dd/MM/yyyy HH:mm";

  try {
    return format(parseISO(date), customFormat || dateFormat, {
      locale: locale !== "pt-BR" ? enUS : ptBR,
    });
  } catch (error) {
    return "";
  }
}
