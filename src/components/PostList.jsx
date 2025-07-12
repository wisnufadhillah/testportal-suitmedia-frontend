import { useState, useEffect, useCallback } from "react"; 
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import axios from "axios";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem("currentPage")) || 1);
    const [pageSize, setPageSize] = useState(() => parseInt(localStorage.getItem("pageSize")) || 10);
    const [sort, setSort] = useState(() => localStorage.getItem("sort") || "-published_at");
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
        localStorage.setItem("pageSize", pageSize);
        localStorage.setItem("sort", sort);
    }, [currentPage, pageSize, sort]);

    // fetch API Suitmedia
    const fetchPosts = useCallback(async () => {
        try {
            const params = {
                "page[number]": currentPage,
                "page[size]": pageSize,
                append: ["small_image", "medium_image"], 
                sort: sort,
            };
            const url = `/api/ideas`;
            const res = await axios.get(url, { params });

            console.log(res);

            const data = res.data;
            

            if (data?.data && Array.isArray(data.data)) {

                setPosts(data.data);
                const total = data.meta?.total ?? data.data.length;
                setTotalItems(total);
                setTotalPages(Math.max(1, Math.ceil(total / pageSize)));
            } else {
                setPosts([]);
                setTotalItems(0);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]);
            setTotalItems(0);
            setTotalPages(1);
        }
    }, [currentPage, pageSize, sort]); 

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]); 

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(startItem + posts.length - 1, totalItems);

    return (
        <div className="w-full px-4 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full mb-6">
                <p className="text-sm text-gray-600">
                    Menampilkan {startItem} - {endItem} dari {totalItems} ide
                </p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span>Show per page:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value={10}>10 per halaman</option>
                            <option value={20}>20 per halaman</option>
                            <option value={50}>50 per halaman</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span>Sort by:</span>
                        <select
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value="-published_at">Newest</option>
                            <option value="published_at">Oldest</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">{posts.length > 0 ? posts.map((post) => <PostCard key={post.id} post={post} />) : <div className="col-span-full text-center text-gray-500">Tidak ada data tersedia.</div>}</div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}
