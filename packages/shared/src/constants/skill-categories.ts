interface Skill {
  name: string;
  icon: string;
  monotone?: boolean;
}

interface SkillCategory {
  titleEN: string;
  titlePT: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    titleEN: "Programming Languages",
    titlePT: "Linguagens de Programação",
    skills: [
      { name: "JavaScript", icon: "devicon:javascript" },
      { name: "Python", icon: "devicon:python" },
      { name: "C#", icon: "devicon:csharp" },
    ],
  },
  {
    titleEN: "Libraries & Frameworks",
    titlePT: "Bibliotecas & Frameworks",
    skills: [
      { name: "React.js", icon: "devicon:react" },
      { name: "Angular", icon: "devicon:angular" },
      { name: "Vue.js", icon: "devicon:vuejs" },
      { name: "Next.js", icon: "devicon:nextjs" },
      { name: "Nuxt.js", icon: "devicon:nuxtjs" },
      { name: "TypeScript", icon: "devicon:typescript" },
      { name: "jQuery", icon: "devicon:jquery" },
      { name: "Styled Components", icon: "devicon:styledcomponents" },
      { name: "Tailwind CSS", icon: "devicon:tailwindcss" },
      { name: "Bootstrap", icon: "devicon:bootstrap" },
      { name: "Express", icon: "devicon:express", monotone: true },
      { name: "Prisma", icon: "devicon:prisma" },
      { name: "Socket.io", icon: "devicon:socketio", monotone: true },
      { name: "Nest.js", icon: "devicon:nestjs" },
      { name: "Django", icon: "logos:django-icon" },
      { name: "Flask", icon: "devicon:flask", monotone: true },
      { name: "Entity Framework", icon: "devicon:dotnetcore" },
      { name: "AutoMapper", icon: "devicon:csharp" },
      { name: "Moq", icon: "devicon:csharp" },
      { name: "xUnit", icon: "devicon:dotnetcore" },
    ],
  },
  {
    titleEN: "Databases",
    titlePT: "Bancos de Dados",
    skills: [
      { name: "PostgreSQL", icon: "devicon:postgresql" },
      { name: "MySQL", icon: "devicon:mysql" },
      { name: "Microsoft SQL Server", icon: "devicon:microsoftsqlserver" },
      { name: "MongoDB", icon: "devicon:mongodb" },
    ],
  },
  {
    titleEN: "Development Tools",
    titlePT: "Ferramentas de Desenvolvimento",
    skills: [
      { name: "Figma", icon: "devicon:figma" },
      { name: "Canva", icon: "devicon:canva" },
      { name: "Postman", icon: "devicon:postman" },
      { name: "DevTools", icon: "devicon:chrome" },
    ],
  },
  {
    titleEN: "Testing & Automation",
    titlePT: "Testes & Automação",
    skills: [
      { name: "Jest", icon: "logos:jest" },
      { name: "Selenium", icon: "devicon:selenium" },
      { name: "Scrapy", icon: "devicon:python" },
    ],
  },
  {
    titleEN: "Infrastructure & DevOps",
    titlePT: "Infraestrutura & DevOps",
    skills: [
      { name: "GitHub Actions", icon: "devicon:githubactions" },
      { name: "Azure DevOps", icon: "devicon:azure" },
      { name: "Docker", icon: "devicon:docker" },
      { name: "Ansible", icon: "devicon:ansible" },
      { name: "NGINX", icon: "logos:nginx" },
      { name: "RabbitMQ", icon: "devicon:rabbitmq" },
    ],
  },
];
