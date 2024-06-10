import { Detail, Item } from "../../../models/type";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { embedMovie, imageOriginal, imageResize } from "../../../api/constants";

import Image from "../../../components/Shared/Image";
import Link from "next/link";
import Meta from "../../../components/Shared/Meta";
import StarRating from "../../../components/Display/StarRating";
import { getWatchMovieContent } from "../../../api/movies";
import { useSelector } from "react-redux";
import { Avatar, Button, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { FaChevronDown, FaRegClock, FaRegComments } from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import { format } from 'date-fns-tz';
import { addComments, editComments, listComments, listCommentsByVideo } from "../../../api/comment";
import { Comment } from "../../../models/comment";
import { toast } from "react-toastify";
import { addComment, editComment, getDetailComments } from "../../../features/comment/comment.slice";
import { useAppDispatch } from "../../../app/hook";


interface WatchMovieProps {
    data: any;
    similar: Item[];
}

export const convertToVietnameseTime = (utcTimeString: string) => {
    const date = new Date(utcTimeString);
    const vietnameseTime = date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    return vietnameseTime;
}

const WatchMovie: NextPage<WatchMovieProps> = ({ similar, data }) => {
    const user = useSelector((state: any) => state.auth.value)
    const commentsData = useSelector((state: any) => state.comment.value)
    const currentTime = new Date();

    const [replies, setReplies] = useState<{ reply: string; check: boolean; }[]>([]);
    const [reply, setReply] = useState('');
    const [check, setCheck] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [searchInputValueReply, setSearchInputValueReply] = useState("");
    const dispatch = useAppDispatch();
    const handleSearchFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const commentNew = {
            user: user,
            movieId: data.id,
            desc: searchInputValue,
            type: similar[0].media_type,
            createdAt: currentTime.toISOString(),
            replies: []
        }
        dispatch(addComment(commentNew));
        setSearchInputValue("");
        setCheck(true)
        toast.success("Bình luận thành công")
    };

    const handleSearchUpdate = async (e: any) => {
        e.preventDefault();
        const commentChange = commentsData.find((element: Comment) => element.id == reply)

        const commentReply = {
            ...commentChange,
            replies: [...commentChange?.replies, {
                user: user,
                desc: searchInputValueReply,
                updatedAt: currentTime.toISOString(),
            }],
        }
        const commentnew = await dispatch(editComment(commentReply))
        if (commentnew) {
            setSearchInputValueReply("");
            setCheck(true)
            toast.success("Bình luận thành công")
        }
    };

    useEffect(() => {
        const getDataComment = async () => {
            const datanew = await dispatch(getDetailComments(data.id))

        }
        getDataComment()
        setCheck(false)
    }, []);

    // Hàm để xử lý sự kiện click vào nút "Trả lời"
    const handleReplyClick = (commentId: string, event: any) => {
        const reply = { reply: commentId, check: true }
        setReplies([...replies, reply]);
        const clickedDiv = event.currentTarget.style.display = 'none';
    };

    // Hàm để xử lý sự kiện click vào nút "Trả lời"
    const handleReplyClickReply = (commentId: string) => {
        setReply(commentId);
    };

    return (
        <>
            <Meta
                title={`${data.title} - Xem Phim - Phim FPOLY`}
                description="Xem phim của bạn"
                image={imageOriginal(data.backdrop_path)}
            />
            <div className="mt-28 flex flex-col lg:flex-row px-5 lg:px-20 gap-8">
                <div className="flex-grow">
                    <div
                        className="relative h-0 w-full"
                        style={{ paddingBottom: "56.25%" }}
                    >
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={embedMovie(data.id)}
                            title=""
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="my-10 flex flex-col items-start gap-4 ">
                        <Link href={`/movie/${data.id}`}>
                            <a className="text-2xl hover:text-orange transition">
                                {data.title}
                            </a>
                        </Link>
                        <p>{data.overview}</p>
                        <p>Ngày Phát Hành: {data.release_date}</p>
                        <StarRating
                            maximum={10}
                            stars={Math.round(data.vote_average)}
                            extraText={` (${data.vote_count} votes)`}
                        />
                        {user &&
                            <div className="w-full">
                                <div>
                                    <p>Bình luận</p>
                                </div>
                                <div className="flex justify-between mb-8 gap-3  h-full">
                                    <Image
                                        src={user.image}
                                        style={{ width: 40, height: 44, borderRadius: "10%" }}
                                    ></Image>
                                    <form action="" className="h-auto w-full" onSubmit={handleSearchFormSubmit}>
                                        <Input
                                            placeholder="Nhập bình luận của bạn..."
                                            className="h-full"
                                            value={searchInputValue}
                                            onChange={(e) => setSearchInputValue(e.target.value)}
                                            style={{ background: 'none', borderColor: '#616161', color: 'white' }}
                                        />
                                    </form>

                                </div>

                                {commentsData &&
                                    commentsData.map((comment: Comment, index: number) => (
                                        <div key={index} className="flex mb-8 gap-3 w-full h-full">
                                            {comment?.user?.image ?
                                                <Image
                                                    src={comment.user.image}
                                                    style={{ width: 40, height: 44, borderRadius: "10%" }}
                                                ></Image>
                                                :
                                                <Avatar shape="square" size="large" icon={<UserOutlined />} />
                                            }
                                            <div className="h-auto">
                                                <div>
                                                    <div className="text-blue-500">{String(comment.user?.name)}</div>
                                                    <div>{comment.desc}</div>
                                                    <div className="flex justify-between text-xs gap-4">
                                                        <div className="flex items-center gap-1 my-auto hover:cursor-pointer" onClick={() => handleReplyClickReply(String(comment.id))}><FaRegComments /> trả lời </div>
                                                        <div className="flex items-center gap-1 my-auto"><FaRegClock /> {convertToVietnameseTime(String(comment.createdAt))}</div>
                                                    </div>
                                                    {
                                                        reply == comment.id &&
                                                        <form action="" className="h-auto w-full" onSubmit={handleSearchUpdate}>
                                                            <Input
                                                                placeholder="Nhập trả lời của bạn..."
                                                                className="h-full"
                                                                value={searchInputValueReply}
                                                                onChange={(e) => setSearchInputValueReply(e.target.value)}
                                                                style={{ background: 'none', borderColor: '#616161', color: 'white' }}
                                                            />
                                                        </form>
                                                    }

                                                    {
                                                        replies &&
                                                        replies.map((item: any, index: number) => (
                                                            item.reply == comment.id &&
                                                            <div key={index}>
                                                                {comment.replies?.map((reply: Comment, index: number) => (
                                                                    <div key={index} className="flex mb-8 gap-3 w-full h-full my-3">
                                                                        {reply.user.image ?
                                                                            <Image
                                                                                src={reply.user.image}
                                                                                style={{ width: 40, height: 44, borderRadius: "10%" }}
                                                                            ></Image>
                                                                            :
                                                                            <Avatar shape="square" size="large" icon={<UserOutlined />} />
                                                                        }
                                                                        <div className="h-auto">
                                                                            <div>
                                                                                <div className="text-blue-500">{reply.user.name}</div>
                                                                                <div>{reply.desc}</div>
                                                                                <div className="flex justify-between text-xs gap-8">
                                                                                    <div className="flex items-center gap-1 my-auto" onClick={() => (String(comment.id))}><FaRegComments /> trả lời </div>
                                                                                    <div className="flex items-center gap-1 my-auto"><FaRegClock /> {convertToVietnameseTime(String(reply?.updatedAt))}</div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                )
                                                                )}
                                                            </div>
                                                        ))
                                                    }
                                                    {comment.replies?.length > 0 &&
                                                        < div key={index} className="flex py-2 items-center text-[10px] italic gap-1 cursor-pointer" onClick={(e) => handleReplyClick(String(comment.id), e)}  >
                                                            {comment.replies?.length} trả lời <FaChevronDown />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="flex-shrink-0 w-full lg:w-80 flex flex-col gap-4 overflow-y-auto lg:max-h-screen">
                    <h1 className="text-xl text-gray-100">Phim Tương Tự</h1>
                    {similar.map((item) => (
                        <Link key={item.id} href={`/movie/${item.id}`}>
                            <a>
                                <div className="flex gap-4 pr-5 group cursor-pointer">
                                    <Image
                                        className="w-[80px] h-[120px] object-cover group-hover:brightness-75 transition duration-300"
                                        src={imageResize(item.poster_path, "w92")}
                                        alt=""
                                    />
                                    <div className="py-3 group-hover:text-orange transition duration-300">
                                        <h1 className="text-gray-100">{item.title}</h1>
                                        <StarRating
                                            stars={Math.round(item.vote_average / 2)}
                                            maximum={5}
                                        />
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div >

        </>
    );
};




export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const id = params?.id as string;
        const response = await getWatchMovieContent(id);

        return {
            props: {
                ...response,

            },
            revalidate: 3600,
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
            revalidate: true,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export default WatchMovie;
