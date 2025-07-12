export default function PostCard({ post }) {
    const imageUrl = post.small_image[0]?.url ?? "https://via.placeholder.com/400x300.png?text=No+Image";
    const image = imageUrl.replace("https://assets.suitdev.com", "/image-proxy");

    console.log({
        originalUrl: imageUrl,
        proxyUrl: image,
        fullImageData: post.small_image[0]
    });
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition h-full flex flex-col">
            <img src={image} alt={post.title} loading="lazy" className="w-full h-[180px] object-cover rounded-md mb-4" />
            <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-gray-500 mb-1">{post?.published_at ?? "-"}</p>
                <h3 className="text-md font-semibold line-clamp-3">{post?.title ?? "Untitled"}</h3>
            </div>
        </div>
    );
}
