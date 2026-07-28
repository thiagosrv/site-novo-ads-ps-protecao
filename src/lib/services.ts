export type ServiceCategory =
  | "portaria"
  | "limpeza"
  | "facilities"
  | "vigilancia"
  | "jardinagem"
  | "recepcao"
  | "geral";

export type RealServiceId =
  | "portaria"
  | "limpeza"
  | "zeladoria"
  | "administrativo"
  | "recepcao"
  | "contabil";

export type ProgrammaticService = {
  slug: string;
  name: string;
  category: ServiceCategory;
  realServiceId: RealServiceId;
  intro: string;
  features: string[];
};

export const SERVICES: ProgrammaticService[] = [
  {
    slug: "contrato-de-prestacao-de-servico-de-portaria",
    name: "Contrato de Prestação de Serviço de Portaria",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Formalizamos o contrato de prestação de serviço de portaria com escopo, escala e SLA definidos por escrito, sem letras miúdas. O acordo cobre substituição em faltas, supervisão do posto e reajuste conforme convenção coletiva da categoria.",
    features: [
      "Contrato com escopo, escala e SLA por escrito",
      "Cláusula de substituição imediata em faltas",
      "Supervisão do posto incluída no contrato",
      "Reajuste conforme convenção coletiva da categoria",
    ],
  },
  {
    slug: "empresa-de-facilities",
    name: "Empresa de Facilities",
    category: "facilities",
    realServiceId: "zeladoria",
    intro:
      "Como empresa de facilities, integramos portaria, limpeza, zeladoria e recepção em um único contrato de gestão, com um só ponto de contato comercial. Isso reduz o número de fornecedores e simplifica a rotina de quem administra o local.",
    features: [
      "Portaria, limpeza, zeladoria e recepção em um só contrato",
      "Ponto único de contato comercial e operacional",
      "Supervisão centralizada de todos os postos",
      "Relatório consolidado de gestão mensal",
    ],
  },
  {
    slug: "empresa-de-jardinagem",
    name: "Empresa de Jardinagem",
    category: "jardinagem",
    realServiceId: "zeladoria",
    intro:
      "A manutenção de jardins e áreas verdes é oferecida como parte do serviço de zeladoria, cobrindo poda, capina e conservação de gramados em áreas comuns. Não se trata de paisagismo especializado, mas de manutenção contínua incluída na rotina do zelador.",
    features: [
      "Poda e capina de áreas verdes comuns",
      "Conservação de gramados e canteiros",
      "Incluído na rotina do zelador dedicado",
      "Comunicação direta com síndico ou gestão",
    ],
  },
  {
    slug: "empresa-de-limpeza-predial-terceirizada",
    name: "Empresa de Limpeza Predial Terceirizada",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "Terceirizamos a limpeza predial completa — áreas comuns, fachadas internas, escadas e elevadores — com equipe uniformizada e produtos inclusos. A escala é dimensionada pelo número de pavimentos e circulação diária do prédio.",
    features: [
      "Limpeza de áreas comuns, escadas e elevadores",
      "Produtos e equipamentos inclusos no contrato",
      "Escala dimensionada pela circulação do prédio",
      "Equipe uniformizada e identificada",
    ],
  },
  {
    slug: "empresa-de-limpeza-terceirizada",
    name: "Empresa de Limpeza Terceirizada",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "Assumimos a limpeza terceirizada do seu ambiente com profissionais próprios, treinados e registrados em CLT — sem vínculo de subcontratação em cascata. Rotinas de higienização são definidas em POP e auditadas periodicamente.",
    features: [
      "Profissionais próprios em CLT, sem subcontratação",
      "Rotinas de higienização definidas em POP",
      "Auditoria periódica da qualidade do serviço",
      "Reposição rápida em caso de falta",
    ],
  },
  {
    slug: "empresa-de-manutencao-predial",
    name: "Empresa de Manutenção Predial",
    category: "facilities",
    realServiceId: "zeladoria",
    intro:
      "A manutenção predial preventiva básica — hidráulica simples, elétrica de baixa complexidade, pintura de retoque — é conduzida dentro do escopo de zeladoria. Demandas que exigem profissional especializado ou ART são encaminhadas via chamado registrado.",
    features: [
      "Manutenção preventiva básica incluída na zeladoria",
      "Abertura de chamado para demandas especializadas",
      "Controle de materiais e estoque do prédio",
      "Suporte contínuo às demandas operacionais",
    ],
  },
  {
    slug: "empresa-de-portaria",
    name: "Empresa de Portaria",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Como empresa de portaria, selecionamos e treinamos os profissionais que ficam à frente do seu acesso, com POP definido para triagem de visitantes e registro de ocorrências. A supervisão de campo acompanha o posto além do contrato assinado.",
    features: [
      "Seleção e treinamento dos profissionais de portaria",
      "POP definido para triagem de visitantes",
      "Registro de ocorrências em relatório",
      "Supervisão de campo além do contrato",
    ],
  },
  {
    slug: "empresa-de-portaria-de-condominio",
    name: "Empresa de Portaria de Condomínio",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Atuamos como empresa de portaria de condomínio residencial e comercial, com processos de identificação de visitantes, controle de prestadores de serviço e apoio direto ao síndico. Reportes de ocorrência facilitam a prestação de contas em assembleia.",
    features: [
      "Identificação de visitantes e prestadores de serviço",
      "Apoio direto às demandas do síndico",
      "Relatórios de ocorrência para a assembleia",
      "Escala compatível com o movimento do condomínio",
    ],
  },
  {
    slug: "empresa-de-portaria-terceirizada",
    name: "Empresa de Portaria Terceirizada",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "A terceirização da portaria transfere para a PS Proteção a gestão de escala, encargos trabalhistas e substituição de profissionais, mantendo o padrão de atendimento definido em POP. O cliente recebe relatórios sem precisar administrar folha de pagamento ou convenção coletiva.",
    features: [
      "Gestão de escala e encargos trabalhistas",
      "Substituição de profissionais sem custo extra ao cliente",
      "Padrão de atendimento definido em POP",
      "Relatórios periódicos sem gestão de folha",
    ],
  },
  {
    slug: "empresa-de-terceirizacao-de-limpeza",
    name: "Empresa de Terceirização de Limpeza",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "A terceirização de limpeza remove da sua empresa a gestão de EPIs, produtos químicos e escala de equipe, deixando isso sob nossa responsabilidade contratual. Auditorias de qualidade acontecem sem aviso prévio para garantir aderência ao padrão combinado.",
    features: [
      "Gestão de EPIs e produtos químicos por nossa conta",
      "Escala de equipe administrada pela contratada",
      "Auditorias de qualidade sem aviso prévio",
      "Padrão de limpeza formalizado em contrato",
    ],
  },
  {
    slug: "empresa-de-terceirizacao-de-portaria",
    name: "Empresa de Terceirização de Portaria",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Cuidamos de ponta a ponta da terceirização de portaria: recrutamento, treinamento, uniformização, escala e supervisão. O contratante mantém o controle sobre o padrão de atendimento sem carregar o vínculo empregatício direto.",
    features: [
      "Recrutamento e treinamento de porteiros",
      "Uniformização e identificação da equipe",
      "Escala e supervisão contínua do posto",
      "Sem vínculo empregatício direto para o contratante",
    ],
  },
  {
    slug: "empresa-de-terceirizacao-de-servicos",
    name: "Empresa de Terceirização de Serviços",
    category: "geral",
    realServiceId: "portaria",
    intro:
      "Como empresa de terceirização de serviços, integramos portaria, limpeza, zeladoria, recepção e suporte administrativo em contratos combinados ou isolados, conforme a necessidade de cada operação. A gestão de mão de obra sai do escopo interno do cliente e passa a ser nossa responsabilidade contratual.",
    features: [
      "Portaria, limpeza, zeladoria e recepção sob um contrato",
      "Serviços contratáveis de forma isolada ou combinada",
      "Gestão de mão de obra fora do escopo interno do cliente",
      "Supervisão ativa em todos os postos",
    ],
  },
  {
    slug: "empresa-de-terceirizacao-de-servicos-de-limpeza",
    name: "Empresa de Terceirização de Serviços de Limpeza",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "A terceirização de serviços de limpeza inclui dimensionamento de equipe por área construída, fornecimento de materiais e supervisão de rotina. Relatórios de execução documentam a frequência real de cada tarefa realizada.",
    features: [
      "Dimensionamento de equipe por área construída",
      "Fornecimento de materiais e insumos",
      "Supervisão de rotina com checklist",
      "Relatório de execução por tarefa realizada",
    ],
  },
  {
    slug: "empresa-de-vigilancia",
    name: "Empresa de Vigilância",
    category: "vigilancia",
    realServiceId: "portaria",
    intro:
      "O que costuma ser buscado como 'empresa de vigilância' é entregue pela PS Proteção como portaria e controle de acesso com monitoramento eletrônico — profissionais desarmados, com POP de triagem e registro de ocorrências. Não operamos com vigilante armado, categoria que exige registro específico na Polícia Federal.",
    features: [
      "Controle de acesso com monitoramento eletrônico",
      "Profissionais desarmados, sem porte de arma",
      "POP de triagem e registro de ocorrências",
      "Relatórios de rondas e checagens periódicas",
    ],
  },
  {
    slug: "empresa-de-vigilancia-24-horas",
    name: "Empresa de Vigilância 24 Horas",
    category: "vigilancia",
    realServiceId: "portaria",
    intro:
      "Para cobertura de vigilância 24 horas, estruturamos escala de portaria e controle de acesso em três turnos, com supervisão noturna e canal emergencial direto. O serviço é desarmado — para vigilância patrimonial armada, indicamos empresa especializada e licenciada para a atividade.",
    features: [
      "Escala de três turnos, cobertura contínua",
      "Supervisão noturna e canal emergencial direto",
      "Serviço desarmado de controle de acesso",
      "Substituição imediata em caso de falta no plantão",
    ],
  },
  {
    slug: "empresa-de-vigilancia-patrimonial",
    name: "Empresa de Vigilância Patrimonial",
    category: "vigilancia",
    realServiceId: "portaria",
    intro:
      "Importante: a vigilância patrimonial armada é uma categoria regulada, com registro específico na Polícia Federal, e não faz parte do nosso portfólio. O que oferecemos é portaria e controle de acesso com monitoramento eletrônico e rondas desarmadas, cobrindo a mesma necessidade de proteção do patrimônio sem porte de arma.",
    features: [
      "Controle de acesso e rondas desarmadas",
      "Monitoramento eletrônico integrado ao posto",
      "Registro formal de ocorrências patrimoniais",
      "Encaminhamento a parceiro licenciado quando há exigência de armamento",
    ],
  },
  {
    slug: "empresa-de-vigilancia-privada",
    name: "Empresa de Vigilância Privada",
    category: "vigilancia",
    realServiceId: "portaria",
    intro:
      "Buscas por 'vigilância privada' costumam significar controle de acesso e presença ostensiva desarmada em portaria — é exatamente esse serviço que prestamos, com profissionais uniformizados e supervisão de campo. Vigilância armada é atividade licenciada à parte, fora do nosso escopo.",
    features: [
      "Presença ostensiva desarmada na portaria",
      "Profissionais uniformizados e identificados",
      "Supervisão de campo periódica",
      "POP de abordagem e triagem de visitantes",
    ],
  },
  {
    slug: "facilities",
    name: "Facilities",
    category: "facilities",
    realServiceId: "zeladoria",
    intro:
      "Facilities, para nós, significa unir portaria, limpeza, zeladoria, recepção e suporte administrativo sob um único contrato de gestão. O objetivo é reduzir o número de fornecedores que o cliente precisa acompanhar, mantendo um só padrão de qualidade em toda a operação.",
    features: [
      "Contrato único cobrindo múltiplos serviços",
      "Padrão de qualidade unificado entre postos",
      "Redução do número de fornecedores gerenciados",
      "Relatório consolidado de gestão",
    ],
  },
  {
    slug: "jardinagem-em-condominios",
    name: "Jardinagem em Condomínios",
    category: "jardinagem",
    realServiceId: "zeladoria",
    intro:
      "Em condomínios, a manutenção de jardins entra como atribuição do zelador dedicado, cobrindo poda, rega e conservação de áreas verdes comuns. Para projetos de paisagismo ou reforma completa, recomendamos empresa especializada — nosso escopo é manutenção contínua, não criação de projeto.",
    features: [
      "Poda, rega e conservação de áreas verdes",
      "Atribuição incluída na rotina do zelador",
      "Reporte de necessidades ao síndico",
      "Manutenção contínua, não projeto paisagístico",
    ],
  },
  {
    slug: "limpeza-tecnica-industrial",
    name: "Limpeza Técnica Industrial",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "Indústrias e centros logísticos exigem rotina de limpeza compatível com fluxo operacional contínuo, uso de EPIs adequados e produtos que não interfiram em processos produtivos. Dimensionamos a equipe conforme a área construída e o regime de turnos da planta.",
    features: [
      "Rotina compatível com operação industrial contínua",
      "EPIs e produtos adequados ao ambiente fabril",
      "Equipe dimensionada por turno de produção",
      "Checklist de execução por setor da planta",
    ],
  },
  {
    slug: "manutencao-predial",
    name: "Manutenção Predial",
    category: "facilities",
    realServiceId: "zeladoria",
    intro:
      "A manutenção predial básica — reparos simples, pintura de retoque, checagem de instalações — faz parte da rotina de zeladoria contratada. Chamados que exigem profissional técnico especializado ou emissão de ART são abertos separadamente, com orçamento à parte.",
    features: [
      "Reparos simples e pintura de retoque inclusos",
      "Checagem periódica de instalações comuns",
      "Abertura de chamado para demandas técnicas",
      "Controle de materiais usados na manutenção",
    ],
  },
  {
    slug: "empresa-de-terceirizacao-de-servicos-gerais",
    name: "Empresa de Terceirização de Serviços Gerais",
    category: "geral",
    realServiceId: "zeladoria",
    intro:
      "Serviços gerais, no nosso portfólio, cobrem zeladoria, limpeza e apoio operacional combinados conforme a rotina do local. A equipe é dimensionada para cobrir tarefas de conservação e organização sem sobreposição de funções entre os profissionais.",
    features: [
      "Zeladoria, limpeza e apoio operacional combinados",
      "Dimensionamento sem sobreposição de funções",
      "Escala ajustada à rotina real do local",
      "Supervisão conjunta de todas as frentes",
    ],
  },
  {
    slug: "servicos-terceirizados-para-condominios",
    name: "Serviços Terceirizados para Condomínios",
    category: "geral",
    realServiceId: "portaria",
    intro:
      "Para condomínios, combinamos portaria, zeladoria e limpeza em contratos que respeitam a convenção condominial e o orçamento aprovado em assembleia. O síndico recebe um único relatório mensal cobrindo todas as frentes terceirizadas.",
    features: [
      "Portaria, zeladoria e limpeza combinadas para condomínios",
      "Contrato compatível com orçamento de assembleia",
      "Relatório mensal único para o síndico",
      "Substituição de profissionais sem custo adicional",
    ],
  },
  {
    slug: "terceirizacao-de-servicos-gerais",
    name: "Terceirização de Serviços Gerais",
    category: "geral",
    realServiceId: "zeladoria",
    intro:
      "A terceirização de serviços gerais tira da empresa contratante a gestão direta de zeladoria, limpeza e apoio operacional, transferindo encargos trabalhistas e escala para a PS Proteção. O cliente acompanha o resultado por relatório, sem administrar a equipe no dia a dia.",
    features: [
      "Encargos trabalhistas e escala sob nossa gestão",
      "Zeladoria, limpeza e apoio operacional inclusos",
      "Acompanhamento por relatório periódico",
      "Cliente livre da administração direta da equipe",
    ],
  },
  {
    slug: "portaria-24-horas-terceirizada",
    name: "Portaria 24 Horas Terceirizada",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "A portaria 24 horas terceirizada opera em escala de três turnos, com passagem de plantão documentada e supervisão que cobre também o período noturno. A gestão de folga, banco de horas e substituição fica inteiramente sob nossa responsabilidade contratual.",
    features: [
      "Escala de três turnos com passagem de plantão",
      "Supervisão cobrindo também o período noturno",
      "Gestão de folgas e banco de horas por nossa conta",
      "Substituição imediata em caso de falta",
    ],
  },
  {
    slug: "portaria-24-horas",
    name: "Portaria 24 Horas",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Portaria 24 horas significa cobertura ininterrupta de controle de acesso, com POP específico para o turno noturno — quando o volume de visitantes cai, mas o risco de descuido na triagem aumenta. Cada troca de turno é registrada em relatório de passagem.",
    features: [
      "Cobertura ininterrupta de controle de acesso",
      "POP específico para o turno noturno",
      "Relatório de passagem a cada troca de turno",
      "Canal direto para emergências fora do horário comercial",
    ],
  },
  {
    slug: "portaria-para-condominios",
    name: "Portaria para Condomínios",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "A portaria para condomínios prioriza o relacionamento com moradores e a triagem cuidadosa de prestadores de serviço e entregadores. O porteiro é treinado para lidar com regras específicas de convenção e regimento interno de cada prédio.",
    features: [
      "Relacionamento próximo com moradores",
      "Triagem de prestadores e entregadores",
      "Treinamento sobre convenção e regimento interno",
      "Apoio direto ao síndico em ocorrências",
    ],
  },
  {
    slug: "portaria-para-empresas",
    name: "Portaria para Empresas",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Em ambiente corporativo, a portaria para empresas foca em controle de acesso de colaboradores, visitantes e prestadores, com registro compatível com política de segurança da informação do cliente. A escala acompanha o horário comercial ou o regime de turnos da operação.",
    features: [
      "Controle de acesso de colaboradores e visitantes",
      "Registro compatível com política de segurança do cliente",
      "Escala ajustada ao horário comercial ou turnos",
      "Relatórios de acesso para auditoria interna",
    ],
  },
  {
    slug: "portaria-terceirizada",
    name: "Portaria Terceirizada",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Portaria terceirizada é a transferência integral da gestão do posto — seleção, escala, uniforme, supervisão e encargos — para a PS Proteção, mantendo o padrão de atendimento definido junto ao cliente. A cobertura em faltas é garantida contratualmente.",
    features: [
      "Seleção, escala e uniforme sob nossa gestão",
      "Padrão de atendimento definido com o cliente",
      "Cobertura garantida contratualmente em faltas",
      "Encargos trabalhistas fora do escopo do contratante",
    ],
  },
  {
    slug: "portaria-terceirizada-para-condominios",
    name: "Portaria Terceirizada para Condomínios",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Para condomínios, a portaria terceirizada resolve o desgaste de contratar e demitir porteiros diretamente, transferindo esse processo para nós. O síndico mantém o controle sobre o padrão de atendimento por meio de reuniões periódicas e relatórios de ocorrência.",
    features: [
      "Contratação e substituição de porteiros por nossa conta",
      "Reuniões periódicas de acompanhamento com o síndico",
      "Relatórios de ocorrência documentados",
      "Padrão de atendimento definido junto ao condomínio",
    ],
  },
  {
    slug: "recepcao-terceirizada",
    name: "Recepção Terceirizada",
    category: "recepcao",
    realServiceId: "recepcao",
    intro:
      "A recepção terceirizada coloca profissionais treinados para atendimento presencial e telefônico, controle de agenda de salas e triagem de visitas — sendo a primeira impressão da sua empresa. Postura profissional e uniformização seguem o padrão da marca do cliente.",
    features: [
      "Atendimento presencial e telefônico treinado",
      "Controle de agenda e salas de reunião",
      "Triagem e encaminhamento de visitas",
      "Uniformização conforme padrão da marca do cliente",
    ],
  },
  {
    slug: "servico-de-facilities",
    name: "Serviço de Facilities",
    category: "facilities",
    realServiceId: "zeladoria",
    intro:
      "O serviço de facilities integra portaria, limpeza, zeladoria e recepção sob supervisão única, com relatório de gestão consolidado. É indicado para quem já contrata esses serviços separadamente e busca reduzir custo administrativo com fornecedores.",
    features: [
      "Portaria, limpeza, zeladoria e recepção integradas",
      "Supervisão única para todas as frentes",
      "Relatório de gestão consolidado",
      "Redução de custo administrativo com fornecedores",
    ],
  },
  {
    slug: "servico-de-jardinagem",
    name: "Serviço de Jardinagem",
    category: "jardinagem",
    realServiceId: "zeladoria",
    intro:
      "O serviço de jardinagem que oferecemos é a manutenção contínua de áreas verdes comuns — poda, rega e limpeza de canteiros — dentro do escopo de zeladoria. Não cobre paisagismo, projeto ou reforma de jardim, apenas conservação de rotina.",
    features: [
      "Manutenção contínua de áreas verdes comuns",
      "Poda, rega e limpeza de canteiros",
      "Incluído no escopo de zeladoria contratada",
      "Não cobre projeto paisagístico ou reforma",
    ],
  },
  {
    slug: "servico-de-limpeza",
    name: "Serviço de Limpeza",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "O serviço de limpeza cobre ambientes internos e externos, banheiros, copas, vidros e esquadrias, com produtos e equipamentos inclusos no contrato. A frequência de cada tarefa é definida junto ao cliente conforme o uso real do espaço.",
    features: [
      "Ambientes internos e externos, banheiros e copas",
      "Limpeza de vidros e esquadrias",
      "Produtos e equipamentos inclusos",
      "Frequência de tarefas ajustada ao uso do espaço",
    ],
  },
  {
    slug: "servico-de-limpeza-em-condominio",
    name: "Serviço de Limpeza em Condomínio",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "Em condomínios, a limpeza cobre áreas comuns, halls, escadas, elevadores e salão de festas, com escala compatível com o movimento de moradores. O time é o mesmo em cada visita, o que facilita o relacionamento com síndico e moradores.",
    features: [
      "Áreas comuns, halls, escadas e elevadores",
      "Limpeza do salão de festas e áreas de lazer",
      "Escala compatível com o movimento de moradores",
      "Equipe fixa para facilitar o relacionamento",
    ],
  },
  {
    slug: "servico-de-limpeza-industrial",
    name: "Serviço de Limpeza Industrial",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "Limpeza industrial exige EPIs específicos, produtos compatíveis com o processo produtivo e rotina alinhada aos turnos da fábrica. Estruturamos a equipe conforme a área construída e as normas de segurança do cliente.",
    features: [
      "EPIs específicos para ambiente industrial",
      "Produtos compatíveis com o processo produtivo",
      "Rotina alinhada aos turnos de produção",
      "Equipe dimensionada pela área construída",
    ],
  },
  {
    slug: "servico-de-limpeza-terceirizada",
    name: "Serviço de Limpeza Terceirizada",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "Terceirizar o serviço de limpeza remove da empresa a gestão de escala, EPIs e produtos químicos, deixando isso sob nossa responsabilidade contratual. Auditorias periódicas garantem que o padrão combinado seja mantido mês a mês.",
    features: [
      "Gestão de escala, EPIs e produtos por nossa conta",
      "Auditorias periódicas de qualidade",
      "Padrão de limpeza formalizado em contrato",
      "Substituição rápida em caso de falta",
    ],
  },
  {
    slug: "servico-de-portaria",
    name: "Serviço de Portaria",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "O serviço de portaria cobre controle de entrada e saída, identificação de visitantes e registro de ocorrências, seguindo Procedimento Operacional Padrão (POP) definido para cada posto. A supervisão de campo acompanha o cumprimento do padrão combinado.",
    features: [
      "Controle de entrada e saída de pessoas",
      "Identificação e registro de visitantes",
      "POP definido para cada posto",
      "Supervisão de campo periódica",
    ],
  },
  {
    slug: "servico-de-portaria-de-condominio",
    name: "Serviço de Portaria de Condomínio",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "No condomínio, o serviço de portaria soma triagem de visitantes ao conhecimento das regras internas do prédio — quem pode subir sem anunciar, horário de entrega, uso de áreas comuns. O porteiro reporta ocorrências diretamente ao síndico.",
    features: [
      "Triagem de visitantes conforme regras internas",
      "Conhecimento do regimento e convenção do prédio",
      "Reporte de ocorrências ao síndico",
      "Apoio no controle de entregas e prestadores",
    ],
  },
  {
    slug: "servico-de-portaria-e-limpeza",
    name: "Serviço de Portaria e Limpeza",
    category: "geral",
    realServiceId: "portaria",
    intro:
      "Combinamos portaria e limpeza no mesmo contrato para locais que preferem um único fornecedor gerenciando as duas frentes. A supervisão é compartilhada, mas cada função mantém escala, POP e equipe próprios dentro do contrato combinado.",
    features: [
      "Portaria e limpeza sob o mesmo contrato",
      "Supervisão compartilhada entre as duas frentes",
      "Escala e POP próprios para cada função",
      "Um único relatório de gestão mensal",
    ],
  },
  {
    slug: "servico-de-portaria-terceirizada",
    name: "Serviço de Portaria Terceirizada",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "Terceirizar o serviço de portaria transfere seleção, treinamento, escala e substituição de profissionais para a PS Proteção, mantendo o padrão de atendimento acordado com o cliente. O contratante recebe relatórios sem gerir folha de pagamento diretamente.",
    features: [
      "Seleção e treinamento de porteiros por nossa conta",
      "Escala e substituição administradas por nós",
      "Padrão de atendimento acordado previamente",
      "Relatórios sem gestão direta de folha de pagamento",
    ],
  },
  {
    slug: "servico-de-vigilancia",
    name: "Serviço de Vigilância",
    category: "vigilancia",
    realServiceId: "portaria",
    intro:
      "Quando o cliente busca 'serviço de vigilância', normalmente a necessidade real é controle de acesso com presença ostensiva e monitoramento — é isso que entregamos, de forma desarmada. Vigilância patrimonial armada é atividade licenciada à parte, fora do nosso escopo de atuação.",
    features: [
      "Controle de acesso com presença ostensiva desarmada",
      "Monitoramento eletrônico integrado ao posto",
      "Rondas e checagens periódicas registradas",
      "Relatório de ocorrências para o cliente",
    ],
  },
  {
    slug: "servico-de-vigilancia-patrimonial",
    name: "Serviço de Vigilância Patrimonial",
    category: "vigilancia",
    realServiceId: "portaria",
    intro:
      "A proteção do patrimônio, no nosso portfólio, é entregue via portaria e controle de acesso com monitoramento eletrônico e rondas desarmadas — não vigilância armada, que exige registro específico na Polícia Federal e não é um serviço que prestamos. Para essa necessidade específica, recomendamos empresa licenciada para a atividade.",
    features: [
      "Controle de acesso e rondas desarmadas",
      "Monitoramento eletrônico do patrimônio",
      "Registro formal de ocorrências",
      "Encaminhamento a parceiro licenciado quando necessário",
    ],
  },
  {
    slug: "servicos-de-jardinagem-em-condominios",
    name: "Serviços de Jardinagem em Condomínios",
    category: "jardinagem",
    realServiceId: "zeladoria",
    intro:
      "Em condomínios com áreas verdes extensas, a manutenção de jardins é atribuída ao zelador dedicado como parte da rotina contratada, cobrindo poda e conservação básica. Projetos de paisagismo completo seguem fora do nosso escopo e exigem empresa especializada.",
    features: [
      "Poda e conservação básica de jardins comuns",
      "Atribuição do zelador dedicado ao condomínio",
      "Reporte de necessidades à administração",
      "Fora do escopo: projetos de paisagismo completo",
    ],
  },
  {
    slug: "terceirizacao-de-facilities",
    name: "Terceirização de Facilities",
    category: "facilities",
    realServiceId: "zeladoria",
    intro:
      "A terceirização de facilities move para a PS Proteção a gestão de portaria, limpeza, zeladoria e recepção, com contrato único e supervisão centralizada. O cliente acompanha o resultado por relatório consolidado em vez de gerenciar cada frente separadamente.",
    features: [
      "Portaria, limpeza, zeladoria e recepção sob um contrato",
      "Supervisão centralizada de toda a operação",
      "Relatório consolidado de gestão",
      "Fim da necessidade de gerenciar fornecedores isolados",
    ],
  },
  {
    slug: "terceirizacao-de-jardinagem",
    name: "Terceirização de Jardinagem",
    category: "jardinagem",
    realServiceId: "zeladoria",
    intro:
      "A manutenção de jardins terceirizada é incorporada à rotina do zelador, cobrindo poda e conservação de áreas verdes comuns sem contrato à parte. Para reforma ou projeto paisagístico novo, o escopo foge do que prestamos.",
    features: [
      "Poda e conservação incorporadas à rotina do zelador",
      "Sem contrato separado para manutenção básica",
      "Reporte de necessidades à gestão do local",
      "Fora do escopo: reforma ou projeto paisagístico novo",
    ],
  },
  {
    slug: "terceirizacao-de-limpeza",
    name: "Terceirização de Limpeza",
    category: "limpeza",
    realServiceId: "limpeza",
    intro:
      "Terceirizar a limpeza tira da empresa a gestão de produtos, EPIs e escala de equipe, transferindo essa responsabilidade para nós via contrato. Relatórios de execução documentam a frequência real de cada tarefa combinada.",
    features: [
      "Gestão de produtos e EPIs por nossa conta",
      "Escala de equipe administrada pela contratada",
      "Relatório de execução por tarefa",
      "Auditoria de qualidade sem aviso prévio",
    ],
  },
  {
    slug: "terceirizacao-de-portaria",
    name: "Terceirização de Portaria",
    category: "portaria",
    realServiceId: "portaria",
    intro:
      "A terceirização de portaria transfere recrutamento, treinamento, escala e encargos trabalhistas para a PS Proteção, mantendo o padrão de atendimento definido com o cliente. A substituição em faltas é garantida contratualmente, sem custo adicional.",
    features: [
      "Recrutamento, treinamento e escala sob nossa gestão",
      "Encargos trabalhistas fora do escopo do contratante",
      "Substituição garantida contratualmente",
      "Padrão de atendimento definido previamente",
    ],
  },
  {
    slug: "terceirizacao-de-recepcao",
    name: "Terceirização de Recepção",
    category: "recepcao",
    realServiceId: "recepcao",
    intro:
      "Terceirizar a recepção coloca profissionais treinados para atendimento presencial e telefônico, controle de agenda e triagem de visitas, preservando a imagem corporativa do cliente. A gestão de escala e substituição fica sob nossa responsabilidade.",
    features: [
      "Atendimento presencial e telefônico treinado",
      "Controle de agenda e salas de reunião",
      "Imagem corporativa preservada",
      "Gestão de escala e substituição por nossa conta",
    ],
  },
  {
    slug: "terceirizacao-de-servicos",
    name: "Terceirização de Serviços",
    category: "geral",
    realServiceId: "portaria",
    intro:
      "A terceirização de serviços integra, conforme a necessidade, portaria, limpeza, zeladoria, recepção e suporte administrativo em um único contrato de gestão. O objetivo é reduzir o número de fornecedores acompanhados pelo cliente sem perder controle sobre o padrão de qualidade.",
    features: [
      "Portaria, limpeza, zeladoria e recepção combináveis",
      "Contrato único de gestão terceirizada",
      "Supervisão ativa em todas as frentes contratadas",
      "Relatório consolidado de acompanhamento",
    ],
  },
];

export function getServiceBySlug(slug: string): ProgrammaticService | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export const CATEGORY_REPRESENTATIVE_SLUG: Record<ServiceCategory, string> = {
  portaria: "servico-de-portaria",
  limpeza: "servico-de-limpeza",
  facilities: "empresa-de-facilities",
  vigilancia: "servico-de-vigilancia",
  jardinagem: "servico-de-jardinagem",
  recepcao: "recepcao-terceirizada",
  geral: "terceirizacao-de-servicos",
};

export const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  portaria: "Portaria e Controle de Acesso",
  limpeza: "Limpeza e Conservação",
  facilities: "Facilities",
  vigilancia: "Controle de Acesso e Monitoramento",
  jardinagem: "Zeladoria e Áreas Verdes",
  recepcao: "Recepção",
  geral: "Terceirização de Serviços",
};
