export default function Projects() {

    const projects = [

        {
            title: "Ecommerce Platform",
            tech: "React • Node.js • MySQL",
            github: "https://github.com/ashpak0608/amazon",
            desc: "Full ecommerce application with product catalog, cart system and backend APIs."
        },

        {
            title: "Jarvis AI",
            tech: "Python • MySQL",
            github: "https://github.com/ashpak0608/jarvis-ai",
            desc: "Iron Man style AI assistant integrated with system commands."
        },

        {
            title: "Doctor Management System",
            tech: "Node.js • MySQL",
            github: "https://github.com/ashpak0608/doctor_management",
            desc: "System designed for doctors to manage appointments and productivity."
        },

        {
            title: "Haq Hai NGO Platform",
            tech: "Laravel • MySQL",
            github: "https://github.com/ashpak0608/haqhai",
            desc: "Website and admin dashboard for NGO operations."
        },

        {
            title: "Smart HR Management",
            tech: "Laravel • MySQL",
            github: "https://github.com/ashpak0608/haqhai_smarthr",
            desc: "HR management platform for employee operations."
        }

    ];

    return (

        <section id="projects" className="py-24 bg-gray-900 text-white">

            <h2 className="text-4xl text-center font-bold mb-16">
                Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

                {projects.map((p, i) => (

                    <div key={i} className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition">

                        <h3 className="text-xl font-bold">{p.title}</h3>

                        <p className="text-indigo-400 mt-2">{p.tech}</p>

                        <p className="mt-4 text-gray-300">{p.desc}</p>

                        <a
                            href={p.github}
                            target="_blank"
                            className="inline-block mt-4 text-indigo-400"
                        >

                            View Code →

                        </a>

                    </div>

                ))}

            </div>

        </section>

    );

}