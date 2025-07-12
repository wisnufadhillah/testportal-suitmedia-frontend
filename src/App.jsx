import Header from "./components/Header";
import Banner from "./components/Banner";
import PostList from "./components/PostList";

function App() {
    return (
        <div className="w-full min-h-screen scroll-smooth">
            <Header />
            {/* Tambahkan bg-white ke main jika belum ada atau untuk memastikan */}
            <main className="w-full bg-white">
                <Banner />
                <PostList />
            </main>
        </div>
    );
}

export default App;
