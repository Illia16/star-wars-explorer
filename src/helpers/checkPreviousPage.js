export default function checkPreviousPage(page) {
    return page ? page.split('').pop() : null;
};