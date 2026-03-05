export default function Projects() {

    const projects = [
        {
            title: "Ecommerce Platform",
            tech: "Laravel + MySQL",
            desc: "Full ecommerce system with admin dashboard."
        },
        {
            title: "Booking System",
            tech: "Node.js + MySQL",
            desc: "Appointment scheduling platform."
        },
        {
            title: "Portfolio Website",
            tech: "Next.js",
            desc: "Modern responsive portfolio."
        }
    ];

    return (
        <section id="projects" className="py-20 bg-gray-900 text-white">
            <h2 className="text-4xl text-center mb-12 font-bold">Projects</h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                {projects.map((p, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition">
                        <h3 className="text-xl font-bold">{p.title}</h3>
                        <p className="text-indigo-400 mt-2">{p.tech}</p>
                        <p className="mt-3 text-gray-300">{p.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}