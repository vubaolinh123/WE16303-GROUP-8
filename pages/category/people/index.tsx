import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React, { FormEvent, useState } from 'react'
import { getDefaultPeople, getPeopleData } from '../../../api/category'
import MovieGrid from '../../../components/Movie/MovieGrid'
import PeopleGrid from '../../../components/Movie/PeopleGrid'
import { Button, Form, Select } from 'antd'
import { useRouter } from 'next/router'
import { FaSearch } from 'react-icons/fa'
import { search, searchPerson } from '../../../api/movies'

interface CategoryProps {
    data: any,
    dataPeople: any,
    response: any
    q: string,
    newPage: boolean;
    result: any;
}

const PeopleCategory: NextPage<CategoryProps> = ({ dataPeople, data, newPage = false, result }) => {
    const sortLanguage = [{ name: "Korea", value: "ko" }, { name: "America", value: "en" }, { name: "Japan", value: "ja" }, { name: "Vietnam", value: "vi" }]
    const { Option } = Select;
    const [form] = Form.useForm();
    const router = useRouter()
    const [searchInputValue, setSearchInputValue] = useState("");

    const handleSearchFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (searchInputValue == "") {
            router.push({ pathname: "/category/people" });
        }
        if (searchInputValue.trim()) {
            router.push({ pathname: "/category/people", query: { q: searchInputValue } });
        }
    };


    return (
        <div>
            <div className="md:mx-20 pt-20 mx-10">
                <form
                    className="flex flex-col justify-center md:mt-6"
                    onSubmit={handleSearchFormSubmit}
                >
                    <div className="w-full  relative">
                        <button
                            type="submit"
                            className="absolute top-1/2 left-4 -translate-y-1/2"
                        >
                            <FaSearch size={25} />
                        </button>
                        <input
                            value={searchInputValue}
                            onChange={(e) => setSearchInputValue(e.target.value)}
                            className="w-full h-full p-3 pl-14 text-2xl outline-none bg-dark-darken text-gray-100 placeholder-gray-500 rounded"
                            type="text"
                            placeholder="Tên diễn viên..."
                        />
                    </div>
                </form>
            </div>
            <div className="md:mx-20 pt-10 mx-10">

                <PeopleGrid
                    data={newPage == false ? result.results : data?.results}
                    currentPage={newPage == false ? result.page : data?.page}
                    maximumPage={newPage == false ? result.total_pages : data?.total_pages}
                    resolveLink={(page) =>
                        `/category/people?page=${page}`
                    }
                />
            </div>
        </div>

    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        context.res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate")
        const query = context.query
        const q = query.q as string;
        const page = query.page ? Number(query.page) : 1;
        // const year: any = query.year ? Number(query.year) : 0
        // const sort = query.sort_by ? query.sort_by as string : "popularity.desc"
        // const language = query.language ? query.language as string : ""
        // const theatres = query.theatres ? true : false
        const data = await getDefaultPeople(page)
        const dataPeople = await getPeopleData()

        if (!q) {
            return {
                props: {
                    data,
                    dataPeople,
                    newPage: true,
                },
            };
        }

        const response = await searchPerson(q, page);
        return {
            props: {
                data,
                dataPeople,
                result: response,
                // q
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
            revalidate: true,
        };
    }
};

export default PeopleCategory