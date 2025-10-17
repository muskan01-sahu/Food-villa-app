

const Shimmer = () => {
    return(
        <div className="flex flex-wrap" data-testid = "shimmer">
            {Array(12)
                .fill("")
                .map((e , index) => (
                <div key={index} className="w-52 h-56 m-5 shadow-lg bg-gray-400 "></div>))}             
        </div>
    );
};

export default Shimmer;