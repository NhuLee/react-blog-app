import { SelectColumnFilter } from "../components/Post/ListTable";

export const BlogAPI =
    "https://600e3bc23bb1d100179deb6c.mockapi.io/api/blog/news";

export const HeadTitleTable = [
    {
        Header: "Title",
        accessor: "title",
        filter: "fuzzyText",
        disableSortBy: true,
    },
    {
        Header: "Date",
        accessor: "date",
        disableFilters: true,
    },
    {
        Header: "Author name",
        accessor: (row) => row.author.name,
        Filter: SelectColumnFilter,
        filter: "includes",
        disableSortBy: true,
    },
    {
        Header: "Author image",
        accessor: (row) => <img src={row.author.image} />,
        disableFilters: true,
        disableSortBy: true,
    },
    {
        Header: "Thumbnail",
        accessor: (row) => (
            <img src={row.thumbnail.url} style={{ width: "250px" }} />
        ),
        disableFilters: true,
        disableSortBy: true,
    },
];

export const FILE_SIZE = 30000;
