'use client'
import ceo from "@/images/ceo.webp"

const Team = () => {
    const members = [
        {
            id: 1,
            name: "Zaid Bin Hashmat",
            designation: "C.E.O.",
            image: ceo.src
        },

        {
            id: 2,
            name: "Ankita Nigam",
            designation: "C.O.O.",
            image: ceo.src
        },

        {
            id: 3,
            name: "Shantanu Verma",
            designation: "Investor",
            image: ceo.src
        },

        {
            id: 4,
            name: "Palak Khetan",
            designation: "Investor",
            image: ceo.src
        },

        {
            id: 5,
            name: "Ayushi Gupta",
            designation: "Sales Head",
            image: ceo.src
        },

        {
            id: 6,
            name: "Vikas Gurele",
            designation: "Head of Service Team",
            image: ceo.src
        },

        {
            id: 7,
            name: "Chhaya Gautam",
            designation: "Sr. Legal Advisor",
            image: ceo.src
        },

        {
            id: 8,
            name: "Sharda Srivastava",
            designation: "H.R. Manager",
            image: ceo.src
        },

        {
            id: 9,
            name: "Aviral Mishra",
            designation: "Web Developer",
            image: ceo.src
        },

        {
            id: 10,
            name: "Aniket Yadav",
            designation: "Web Developer",
            image: ceo.src
        },

        {
            id: 11,
            name: "Some random name",
            designation: "Web Developer",
            image: ceo.src
        },

        {
            id: 12,
            name: "Ayushi Dubey",
            designation: "Marketing Head",
            image: ceo.src
        },
]

  return (
    <div className="h-[1200px]">
      {/*  */}
      <div className="team-one__top relative flex items-center justify-center gap-[500px] mb-[57px] mt-[100px]">
  <div className="sec-title flex flex-col mr-4">
    <div className="sub-title">
      <h5 className="text-xl font-semibold text-red-600">OUR TEAM MEMBERS</h5><br/>
    </div>
    <h2 className="text-4xl font-bold">Our Talented Team <br/>Members Behind Zairo</h2>
  </div>
  <div className="btn-box flex justify-center text-center">
    <a className="thm-btn text-white bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700" href="#">
      <span className="txt">JOIN OUR TEAM</span>
    </a>
  </div>
</div>
<section className=" bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 px-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden flex flex-col items-center p-4 transition-transform hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

        </div>

        
  );
}

export default Team;
