import { useState } from "react";

const Section = ({title,description,isVisible,setIsVisible})=>{
    return(
        <div className="border border-black p-2 m-2">
            <h3 className="font-bold text-xl">{title}</h3>
            {
                isVisible ? ( <button className="cursor-pointer underline" onClick={() => setIsVisible(false)}>Hide</button>
                )
                :
                ( <button className="cursor-pointer underline" onClick={() => setIsVisible(true)}>show</button>
            )}
          
            
            {isVisible && <p>{description}</p>}

        </div>
        
    );
};

const Instamart = () => {
    const [visibleSection,setVisibleSection] = useState("");
    return(
        <div>
            <h1 className="text-3xl p-2 m-2 font-bold">Instamart</h1>

            <Section 
            title={"About Instamart"}
            description={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit exercitationem voluptatem explicabo esse, necessitatibus aperiam enim quos earum deserunt aut voluptas? Quidem optio, ipsa adipisci nemo repellat eaque quis earum voluptatibus obcaecati voluptatem atque rem porro perferendis dolor minus accusamus architecto, omnis itaque molestiae distinctio magnam amet in vitae! Eum"
            }
            isVisible={visibleSection === "about"}
            setIsVisible={(visible) => setVisibleSection(visible ? "about":"") }
            />
           
           <Section 
           title={"Team Instamart"}
           description={
                "Lorem  lamosa yuoutr ipsum dolor sit amet, consectetur adipisicing elit. Fugit exercitationem voluptatem explicabo esse, necessitatibus aperiam enim quos earum deserunt aut voluptas? Quidem optio, ipsa adipisci nemo repellat eaque quis earum voluptatibus obcaecati voluptatem atque rem porro perferendis dolor minus accusamus architecto, omnis itaque molestiae distinctio magnam amet in vitae! Eum"
            }
            isVisible={visibleSection === "team"}
            setIsVisible={(visible) => setVisibleSection(visible ? "team" : "") }
            />

            <Section 
            title={"Carrers"}
            description={
                "Lorem  lamosa yuoutr ipsum dolor sit amet, consectetur adipisicing elit. Fugit exercitationem voluptatem explicabo esse, necessitatibus aperiam enim quos earum deserunt aut voluptas? Quidem optio, ipsa adipisci nemo repellat eaque quis earum voluptatibus obcaecati voluptatem atque rem porro perferendis dolor minus accusamus architecto, omnis itaque molestiae distinctio magnam amet in vitae! Eum"
            }
            isVisible={visibleSection === "carrer"}
            setIsVisible={(visible) => setVisibleSection(visible ? "carrer": "") }
            />

            
           {/* <AboutInstamart/>
           <DetsilsofInstamart/>
           <TeamInstamart/>
           <Product/>
           <Careers/> */}
        </div>
    );
};

export default Instamart;