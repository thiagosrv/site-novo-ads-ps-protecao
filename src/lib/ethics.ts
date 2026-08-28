export const ETHICS_REPORT_TYPES = [
  {
    value: "Assédio moral",
    description: "Humilhação, constrangimento ou pressão abusiva no ambiente de trabalho.",
  },
  {
    value: "Assédio sexual",
    description: "Investidas, insinuações ou contato indesejado de natureza sexual.",
  },
  {
    value: "Discriminação",
    description: "Tratamento desigual por raça, gênero, orientação, religião, idade ou deficiência.",
  },
  {
    value: "Corrupção ou suborno",
    description: "Oferecimento, solicitação ou recebimento de vantagem indevida.",
  },
  {
    value: "Conflito de interesses",
    description: "Decisões influenciadas por interesses pessoais em detrimento da empresa ou do cliente.",
  },
  {
    value: "Fraude financeira",
    description: "Adulteração de registros, despesas ou informações financeiras.",
  },
  {
    value: "Descumprimento de normas de segurança",
    description: "Falhas propositais em procedimentos de segurança do trabalho ou operacional.",
  },
  {
    value: "Furto ou desvio de patrimônio",
    description: "Apropriação indevida de bens da empresa, do cliente ou de terceiros.",
  },
  {
    value: "Outro",
    description: "Qualquer outra conduta que viole nossos princípios éticos.",
  },
] as const;

export const ETHICS_PROCESS_STEPS = [
  {
    title: "Recebimento",
    text: "Seu relato chega diretamente à nossa central de compliance, sem passar por nenhuma liderança operacional.",
  },
  {
    title: "Triagem",
    text: "Classificamos a gravidade e a área envolvida para direcionar a apuração ao responsável correto.",
  },
  {
    title: "Apuração",
    text: "Conduzimos a investigação com isenção, ouvindo as partes envolvidas e reunindo evidências, sempre preservando o sigilo do relato.",
  },
  {
    title: "Conclusão e retorno",
    text: "Definimos as medidas cabíveis e, se você deixou um e-mail, retornamos com um posicionamento sobre a apuração em até 15 dias úteis.",
  },
] as const;

export const ETHICS_FAQ = [
  {
    question: "Preciso me identificar para registrar um relato?",
    answer:
      "Não. O formulário não pede seu nome em nenhum momento. Você pode, se quiser, deixar um e-mail apenas para receber um retorno sobre a apuração — isso é totalmente opcional e não compromete o anonimato do restante do relato.",
  },
  {
    question: "Quem tem acesso ao meu relato?",
    answer:
      "Apenas a equipe responsável pela apuração de conduta, isolada da liderança operacional diretamente envolvida em cada caso.",
  },
  {
    question: "Posso reportar sobre um cliente ou fornecedor, não só um colaborador?",
    answer:
      "Sim. O canal recebe relatos sobre qualquer pessoa envolvida na nossa operação — colaboradores, lideranças, clientes, fornecedores e parceiros.",
  },
  {
    question: "O que acontece depois que eu envio o relato?",
    answer:
      "Ele passa pelos quatro passos acima: recebimento, triagem, apuração e conclusão. Relatos feitos de boa-fé nunca resultam em retaliação a quem reportou.",
  },
] as const;

export type EthicsReportData = {
  reportType: string;
  description: string;
  email: string;
};

export type EthicsSubmitResult = { ok: true } | { ok: false; error: string };

// Web3Forms: serviço de envio de formulário sem backend próprio — a chave é
// pública por design (usada direto no fetch do cliente) e pode ser
// restrita por domínio no painel do Web3Forms para evitar abuso.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitEthicsReport(data: EthicsReportData): Promise<EthicsSubmitResult> {
  if (!WEB3FORMS_ACCESS_KEY) {
    return {
      ok: false,
      error:
        "O envio ainda não foi configurado neste site. Tente novamente mais tarde ou procure outro canal de contato.",
    };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Novo relato — Canal de Ética PS Proteção",
        from_name: "Canal de Ética (site)",
        "Tipo de relato": data.reportType,
        Descrição: data.description,
        "E-mail para retorno": data.email.trim() || "Não informado (relato anônimo)",
        botcheck: "",
      }),
    });
    const json = (await res.json()) as { success?: boolean; message?: string };
    if (json.success) return { ok: true };
    return { ok: false, error: json.message || "Não foi possível enviar o relato. Tente novamente." };
  } catch {
    return { ok: false, error: "Falha de conexão. Verifique sua internet e tente novamente." };
  }
}
