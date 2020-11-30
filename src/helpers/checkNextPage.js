// figuring out wheather there's more pages for more results (more than 10 entities)
// strings for next/previous pages from API
// getting a previous/next page number from the strings. If no page, then null
export default function checkNextPage(page) {
    return page ? page.split('').pop() : null;
};