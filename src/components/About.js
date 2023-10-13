function Header({ className, children }) { return (
  <div className={ "flex flex-col items-center space-y-2 w-fit " + className }>
    <div className="text-4xl uppercase text-ashes-700 font-title">{ children }</div>
    <hr className="w-1/2 border-ashes-700" />
  </div>
)}

export default function About() {
  return (
    <div className="md:space-y-36 md:pt-20 md:pb-32">
      {/* top half */}
      <div className="md:flex md:space-x-24 md:items-center md:justify-center">
        {/* top text */}
        <div className="flex flex-col items-center md:space-y-8 md:w-[38rem]">
          <Header className="pt-12 md:pt-0">About</Header>
          {/* bridge pic */}
          <img src="bixby-bridge.png" alt="bixby bridge" className="w-full pt-10 md:hidden" />
          <div className="px-10 py-16 text-xl text-justify md:p-0">
          Bridge America was created to help foreign students understand the overcomplicated, decentralised world of American High School Education. We provide short, concise articles to explain different concepts and terms used in the US. Our goal is to take a load of the shoulders of any student moving to the US, so they can focus on adapting to their new environment and jumpstarting their secondary education.
          </div>
        </div>
        {/* bridge pic */}
        <img src="bixby-bridge.png" alt="bixby bridge" className="hidden w-[31.25rem] md:block" />
      </div>
      {/* bottom half */}
      <div className="md:flex md:items-center md:space-x-24 md:justify-center">
        {/* bridge pic */}
        <img src="brooklyn-bridge.png" alt="brooklyn bridge" className="w-full md:w-[31.25rem]" />
        {/* bottom text */}
        <div className="flex flex-col items-center px-10 pt-16 pb-32 space-y-16 md:p-0 md:w-[38rem]">
          <Header>Meet the Team</Header>
          <div className="text-xl text-justify">
            This website was founded and developed by Tadahiro Ueta, a British-Brazilian student who struggled to understand the American education system after moving to Texas on his sophomore year. The UI was designed by a friend of his, who wishes to remain anonymous. The articles were crowdsourced by at-the-time high school students, most of whom had also moved to the US from abroad, giving a fresh perspective on the educative system. If you'd like to contribute to this project, feel free to submit an article and get in contact. 
          </div>
        </div>
      </div>
    </div>
)}