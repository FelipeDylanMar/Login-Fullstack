import MenuHamburguer from "./components/MenuHamburguer";

const Home = () => {
 

  return (
    <div className="flex flex-col min-h-screen bg-[#191970] text-indigo-200">
      <header className="flex justify-between items-center p-4 bg-slate-900 shadow-md">
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition font-bold">Home</a>
          <a href="#" className="hover:text-white transition font-bold">About</a>
          <a href="#" className="hover:text-white transition font-bold">Contact</a>
        </div>
        <MenuHamburguer />
      </header>
      <main className="flex flex-col items-center justify-center flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!</h1>
        <p className="text-lg mb-8">This is the main page of your application.</p>
      </main>
      <footer className="p-4 bg-indigo-800 text-center">
        <p>&copy; 2024 Your Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
