export default function Home() {
    return (
        <>
            <style>
                {`
            html, body {
                overflow: hidden;
            }
        `}
            </style>
            <header className="p-16 h-screen bg-center bg-no-repeat bg-cover overflow-none bg-[url('./images/home-background.jpg')] flex">
                <div className="bg-white/75 rounded-lg text-center p-5 flex flex-col m-auto w-fit">
                    <h1 className="text-black text-3xl font-medium mb-1">
                        The best site for renting houses
                    </h1>
                </div>
            </header>
        </>
    );
}
