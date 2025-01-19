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
    <a
      className="thm-btn text-white bg-red-600 px-6 py-3 rounded-lg hover:scale-out-horizontal hover:scale-in-br relative"
      href="#">
        {/* Hidden or scaled-down second element */}
        <span
          className="absolute inset-0 flex justify-center items-center text-white bg-black text-center px-6 py-3 rounded-lg scale-0  transition-all duration-500"
        >
          <span className="txt">JOIN OUR TEAM</span>
        </span>
        <span className="txt font-semibold">JOIN OUR TEAM</span> {/* The visible text */}
    </a>
  </div>

</div>
<section>
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-white overflow-hidden flex items-center h-[200px] transition-transform hover:scale-105 border border-gray-300 rounded-md shadow-sm group"
        >
          <div className="h-full w-1/3 ">
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-full w-full ">
  <div className="absolute inset-0 bg-black transform scale-y-0 origin-top transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>
  <div className="relative z-10 p-4 w-2/3 text-gray-800 transition-colors duration-500">
    <h3 className="text-xl font-semibold group-hover:text-red-600 group-hover:text-2xl">{member.name}</h3>
    <p className="text-sm group-hover:text-white group-hover:font-bold">{member.designation}</p>
  </div>
</div>

        </div>
      ))}
    </div>
  </div>
</section>



        </div>

        
  );
}

export default Team;
