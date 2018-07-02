package top.zywork.query;

/**
 * 分页查询对象<br/>
 * 创建于2017-08-23<br/>
 *
 * @author 王振宇
 * @version 1.0
 */
public class PageQuery extends BaseQuery {

    private static final long serialVersionUID = 2691743450470042585L;
    // 第几页
    private Integer pageNo;
    // 每页多少项
    private Integer pageSize;
    // 排序字段
    private String sort;
    // 排序规则
    private String order;

    public PageQuery(){}

    public PageQuery(Integer pageNo, Integer pageSize, String sort, String order) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.sort = sort;
        this.order = order;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public int getBeginIndex() {
        return (pageNo - 1) * pageSize;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }
}
