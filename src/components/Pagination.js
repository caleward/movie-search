import React from 'react';

const Pagination= (props) => {
    const pageLinks = []
    /* sets active page to i*/
    for(let i = 1; i <=props.pages +1;i++){
        let active = props.currentPage == i ? 'active' : '';
        pageLinks.push(<li className={`waves-effect ${active}`} key = {i} onClick={() => props.nextPage(i)}><a href="#">{i}</a> </li>)
    }

    /*returns the page you are on and displays next and previous options at the botton to navigate*/
    return (
        <div className="containter">
            <div className="row">
                <ul className="pagination">
                    {props.currentPage >1 ? <li className={`waves-effect`} onClick={() => props.nextPage(props.currentPage-1)}><a href="#">Previous</a> </li>:''}
                    {pageLinks}
                    {props.currentPage < props.pages +1 ? <li className={`waves-effect`} onClick={() => props.nextPage(props.currentPage+1)}><a href="#">Next</a></li> :''}

                </ul>
            </div>
        </div>
    )
}

export default Pagination;