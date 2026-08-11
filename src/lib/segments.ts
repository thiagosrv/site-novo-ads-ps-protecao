import type { ServiceCategory } from "./services";

export type Segment = {
  slug: string;
  name: string;
  intro: string;
  painPoints: string[];
  relevantCategories: ServiceCategory[];
};

export const SEGMENT_CATEGORY_SLUG: Record<ServiceCategory, string> = {
  portaria: "portaria",
  limpeza: "limpeza",
  facilities: "facilities",
  vigilancia: "controle-de-acesso",
  jardinagem: "zeladoria",
  recepcao: "recepcao",
  geral: "servicos-gerais",
};

export const SEGMENT_CATEGORY_LABEL: Record<ServiceCategory, string> = {
  portaria: "Portaria",
  limpeza: "Limpeza",
  facilities: "Facilities",
  vigilancia: "Controle de Acesso",
  jardinagem: "Zeladoria",
  recepcao: "Recepção",
  geral: "Serviços Gerais",
};

export const SEGMENTS: Segment[] = [
  {
    slug: "condominios-residenciais",
    name: "Condomínios Residenciais",
    intro:
      "Condomínios residenciais lidam com fluxo constante de moradores, visitantes, entregadores e prestadores de serviço, exigindo controle de acesso rigoroso sem tornar a rotina do morador burocrática. A rotatividade de porteiros próprios é um problema recorrente em assembleias — a terceirização resolve isso com equipe de reserva e supervisão profissional.",
    painPoints: [
      "Cadastro e liberação ágil de visitantes e entregas",
      "Comunicação direta com síndico e conselho",
      "Adequação ao regimento interno e à convenção do condomínio",
      "Relatório de ocorrências para prestação de contas em assembleia",
    ],
    relevantCategories: ["portaria", "jardinagem", "limpeza"],
  },
  {
    slug: "condominios-empresariais",
    name: "Condomínios Empresariais",
    intro:
      "Condomínios empresariais — galerias, conjuntos de salas comerciais e centros multiuso — somam o desafio de controlar o acesso de múltiplas empresas locatárias, cada uma com seus próprios visitantes e horários, exigindo triagem padronizada sem atrito comercial.",
    painPoints: [
      "Controle de acesso por empresa locatária",
      "Padronização de horários e regras entre múltiplos inquilinos",
      "Interlocução única com a administradora do condomínio",
      "Escala compatível com horário comercial estendido",
    ],
    relevantCategories: ["portaria", "facilities", "limpeza"],
  },
  {
    slug: "condominios-industriais",
    name: "Condomínios Industriais",
    intro:
      "Condomínios industriais reúnem várias empresas operando em galpões vizinhos com fluxo intenso de caminhões, colaboradores e visitantes técnicos, exigindo controle de acesso mais rígido que o residencial, com registro de veículos e cargas.",
    painPoints: [
      "Registro de entrada e saída de veículos e cargas",
      "Controle de acesso de colaboradores de múltiplas empresas",
      "Compatibilidade com normas de segurança do trabalho do condomínio",
      "Rondas periódicas nas áreas comuns entre os galpões",
    ],
    relevantCategories: ["vigilancia", "portaria", "limpeza"],
  },
  {
    slug: "industrias",
    name: "Indústrias",
    intro:
      "Plantas industriais operam em regime de turnos contínuos, com fluxo de colaboradores, caminhões e visitantes técnicos que exige controle de acesso rigoroso e limpeza compatível com o processo produtivo, sem interromper a operação.",
    painPoints: [
      "Controle de acesso compatível com o regime de turnos da planta",
      "Registro de entrada e saída de caminhões e cargas",
      "Limpeza técnica com produtos compatíveis com o processo produtivo",
      "Equipe dimensionada por área construída e turno de produção",
    ],
    relevantCategories: ["vigilancia", "limpeza", "facilities"],
  },
  {
    slug: "centros-logisticos",
    name: "Centros Logísticos",
    intro:
      "Centros logísticos operam com alto volume de veículos, docas e colaboradores terceirizados circulando o dia todo, exigindo controle de acesso ágil que não gere fila nas docas e limpeza compatível com a movimentação intensa de cargas.",
    painPoints: [
      "Controle de acesso ágil para não gerar fila nas docas",
      "Registro de motoristas e transportadoras terceirizadas",
      "Limpeza compatível com o fluxo intenso de cargas",
      "Rondas periódicas no perímetro e pátio de manobras",
    ],
    relevantCategories: ["portaria", "vigilancia", "limpeza"],
  },
  {
    slug: "centros-de-distribuicao",
    name: "Centros de Distribuição",
    intro:
      "Centros de distribuição concentram alto volume de mercadorias e movimentação de colaboradores em turnos, o que exige controle de acesso rígido para reduzir risco de furto e limpeza constante das áreas de separação e expedição.",
    painPoints: [
      "Controle de acesso para reduzir risco de furto de mercadorias",
      "Registro de entrada e saída de colaboradores por turno",
      "Limpeza das áreas de separação, picking e expedição",
      "Rondas periódicas no pátio e docas de carregamento",
    ],
    relevantCategories: ["vigilancia", "limpeza"],
  },
  {
    slug: "galpoes-logisticos",
    name: "Galpões Logísticos",
    intro:
      "Galpões logísticos multiusuário, muitas vezes locados para diferentes operadores, precisam de controle de acesso compartilhado entre as empresas ocupantes e limpeza de áreas comuns e internas sem interromper a operação de nenhum locatário.",
    painPoints: [
      "Controle de acesso compartilhado entre locatários do galpão",
      "Registro de veículos e prestadores de cada operação",
      "Limpeza de áreas comuns e internas sem interromper a operação",
      "Rondas periódicas no perímetro do galpão",
    ],
    relevantCategories: ["vigilancia", "limpeza"],
  },
  {
    slug: "transportadoras",
    name: "Transportadoras",
    intro:
      "Transportadoras têm pátio com entrada e saída constante de caminhões, motoristas terceirizados e cargas, exigindo controle de acesso que registre veículo, motorista e carga a cada movimentação, além de limpeza do pátio e das áreas administrativas.",
    painPoints: [
      "Registro de veículo, motorista e carga a cada movimentação",
      "Controle de acesso do pátio e das docas de carga",
      "Limpeza das áreas administrativas e de espera de motoristas",
      "Rondas periódicas no perímetro e pátio de manobras",
    ],
    relevantCategories: ["vigilancia", "limpeza"],
  },
  {
    slug: "parques-industriais",
    name: "Parques Industriais",
    intro:
      "Parques industriais reúnem múltiplas empresas em uma mesma área cercada, com portaria central controlando o acesso de todas as plantas, exigindo padronização de regras entre ocupantes distintos e manutenção das áreas verdes e comuns compartilhadas.",
    painPoints: [
      "Portaria central compartilhada entre múltiplas empresas ocupantes",
      "Padronização de regras de acesso entre plantas distintas",
      "Manutenção de áreas verdes e vias internas compartilhadas",
      "Relatório consolidado para a administração do parque",
    ],
    relevantCategories: ["vigilancia", "facilities"],
  },
  {
    slug: "obras-e-canteiros-de-obras",
    name: "Obras e Canteiros de Obras",
    intro:
      "Canteiros de obras têm alta rotatividade de mão de obra terceirizada, fornecedores e visitas técnicas, além de risco de furto de materiais e equipamentos — o controle de acesso e a limpeza precisam se adaptar ao avanço físico da obra a cada etapa.",
    painPoints: [
      "Controle de acesso de mão de obra terceirizada e visitas técnicas",
      "Redução do risco de furto de materiais e equipamentos",
      "Adaptação do escopo ao avanço físico da obra em cada etapa",
      "Registro de ocorrências para o engenheiro responsável",
    ],
    relevantCategories: ["portaria", "vigilancia", "limpeza"],
  },
  {
    slug: "hospitais",
    name: "Hospitais",
    intro:
      "Hospitais precisam conciliar acesso facilitado para pacientes e visitantes com controle rígido de áreas restritas, além de limpeza e recepção seguindo protocolos de biossegurança específicos do ambiente de saúde.",
    painPoints: [
      "Controle de acesso a áreas restritas com fluxo facilitado para pacientes",
      "Limpeza seguindo protocolos de biossegurança do ambiente de saúde",
      "Recepção e triagem de visitantes em horários de visita",
      "Registro de ocorrências compatível com a rotina hospitalar",
    ],
    relevantCategories: ["portaria", "limpeza", "recepcao"],
  },
  {
    slug: "clinicas",
    name: "Clínicas",
    intro:
      "Clínicas médicas e odontológicas dependem de uma recepção acolhedora e organizada para a experiência do paciente, junto de controle de acesso discreto que preserve a privacidade sem parecer institucional demais.",
    painPoints: [
      "Recepção acolhedora com controle de agenda de consultas",
      "Controle de acesso discreto que preserva a privacidade do paciente",
      "Triagem e encaminhamento conforme especialidade",
      "Postura alinhada à comunicação visual da clínica",
    ],
    relevantCategories: ["portaria", "recepcao"],
  },
  {
    slug: "escolas",
    name: "Escolas",
    intro:
      "Escolas exigem controle de acesso rigoroso para a segurança de crianças e adolescentes, com liberação criteriosa de responsáveis no horário de entrada e saída, além de limpeza compatível com o uso intenso das instalações.",
    painPoints: [
      "Liberação criteriosa de responsáveis nos horários de entrada e saída",
      "Controle de acesso rigoroso para segurança de crianças e adolescentes",
      "Limpeza compatível com o uso intenso das instalações escolares",
      "Registro de ocorrências para a coordenação pedagógica",
    ],
    relevantCategories: ["portaria", "limpeza"],
  },
  {
    slug: "faculdades",
    name: "Faculdades",
    intro:
      "Faculdades e centros universitários têm fluxo intenso de alunos, professores e visitantes em múltiplos turnos, exigindo portaria com controle de acesso por perfil e uma recepção capaz de orientar o grande volume de pessoas circulando pelo campus.",
    painPoints: [
      "Controle de acesso por perfil (aluno, professor, visitante)",
      "Recepção para orientação de grande volume de pessoas",
      "Escala compatível com turnos diurno, noturno e EAD presencial",
      "Registro de ocorrências para a coordenação acadêmica",
    ],
    relevantCategories: ["portaria", "recepcao"],
  },
  {
    slug: "supermercados",
    name: "Supermercados",
    intro:
      "Supermercados operam com fluxo intenso de clientes durante todo o dia e recebimento constante de mercadorias na área de carga e descarga, exigindo portaria organizada e limpeza contínua das áreas de circulação e frente de loja.",
    painPoints: [
      "Controle da área de carga e descarga de mercadorias",
      "Limpeza contínua das áreas de circulação e frente de loja",
      "Portaria organizada para o fluxo intenso de clientes",
      "Registro de ocorrências para a gestão da loja",
    ],
    relevantCategories: ["portaria", "limpeza"],
  },
  {
    slug: "atacadistas-e-atacarejos",
    name: "Atacadistas e Atacarejos",
    intro:
      "Atacadistas e atacarejos combinam grande circulação de clientes pessoa jurídica com movimentação intensa de cargas no estoque e docas, exigindo controle de acesso que diferencie cliente, fornecedor e colaborador, além de limpeza constante das áreas de armazenagem.",
    painPoints: [
      "Controle de acesso diferenciado entre cliente, fornecedor e colaborador",
      "Registro de movimentação nas docas e área de estoque",
      "Limpeza constante das áreas de armazenagem e corredores",
      "Rondas periódicas no pátio de carga",
    ],
    relevantCategories: ["vigilancia", "limpeza"],
  },
  {
    slug: "shopping-centers",
    name: "Shopping Centers",
    intro:
      "Shopping centers precisam de portaria e controle de acesso coordenados entre lojistas, prestadores e público em geral, com limpeza contínua de áreas comuns durante todo o horário de funcionamento e suporte à administração.",
    painPoints: [
      "Controle de acesso coordenado entre lojistas e prestadores",
      "Limpeza contínua das áreas comuns em horário estendido",
      "Portaria de apoio ao público durante todo o funcionamento",
      "Relatório consolidado para a administração do shopping",
    ],
    relevantCategories: ["portaria", "limpeza", "facilities"],
  },
  {
    slug: "edificios-comerciais",
    name: "Edifícios Comerciais",
    intro:
      "Edifícios comerciais multiempresa concentram dezenas de razões sociais em um só endereço, exigindo portaria e recepção padronizadas para todos os andares, controle de acesso por empresa locatária e zeladoria das áreas comuns.",
    painPoints: [
      "Controle de acesso por empresa locatária em cada andar",
      "Recepção padronizada para todo o edifício",
      "Zeladoria e manutenção preventiva das áreas comuns",
      "Relatório consolidado para a administradora predial",
    ],
    relevantCategories: ["portaria", "recepcao", "facilities"],
  },
  {
    slug: "complexos-corporativos",
    name: "Complexos Corporativos",
    intro:
      "Complexos corporativos com múltiplos blocos e grandes áreas externas exigem uma operação de facilities completa — portaria, recepção, zeladoria e controle de acesso integrados sob uma única gestão para manter o padrão entre todos os prédios do complexo.",
    painPoints: [
      "Integração de portaria, recepção e zeladoria entre múltiplos blocos",
      "Controle de acesso padronizado para todo o complexo",
      "Manutenção das áreas externas e de convivência",
      "Relatório único de gestão para toda a operação",
    ],
    relevantCategories: ["portaria", "facilities", "recepcao"],
  },
  {
    slug: "hoteis",
    name: "Hotéis",
    intro:
      "Hotéis dependem de uma recepção pronta para acolher hóspedes a qualquer hora, aliada a uma governança de limpeza rigorosa nos apartamentos e áreas comuns, além de portaria atenta à segurança de hóspedes e pertences.",
    painPoints: [
      "Recepção disponível para check-in e check-out a qualquer hora",
      "Limpeza rigorosa de apartamentos e áreas comuns",
      "Portaria atenta à segurança de hóspedes e pertences",
      "Escala compatível com a operação hoteleira 24 horas",
    ],
    relevantCategories: ["portaria", "limpeza", "recepcao"],
  },
];

export function getSegmentBySlug(slug: string): Segment | undefined {
  return SEGMENTS.find((segment) => segment.slug === slug);
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return (Object.keys(SEGMENT_CATEGORY_SLUG) as ServiceCategory[]).find(
    (category) => SEGMENT_CATEGORY_SLUG[category] === slug
  );
}
