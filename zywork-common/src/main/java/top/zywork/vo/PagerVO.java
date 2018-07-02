package top.zywork.vo;

import java.util.List;

/**
 * 返回到前端页面的分页对象
 * 创建于2017-08-16
 *
 * @author 王振宇
 * @version 1.0
 */
public class PagerVO extends BaseVO {

    private static final long serialVersionUID = 7596824634662805852L;

    private Integer pageNo;
    private Integer pageSize;
    private Long total;
    private List<Object> rows;

    public PagerVO() {}

    public PagerVO(Integer pageNo, Integer pageSize) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
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

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public List<Object> getRows() {
        return rows;
    }

    public void setRows(List<Object> rows) {
        this.rows = rows;
    }

    public int getBeginIndex() {
        return (pageNo - 1) * pageSize;
    }

    public Long getTotalPage() {
        return total % pageSize == 0 ? total / pageSize : total / pageSize + 1;
    }

    @Override
    public String toString() {
        return "PagerVO{" +
                "pageNo=" + pageNo +
                ", pageSize=" + pageSize +
                ", total=" + total +
                ", rows=" + rows +
                '}';
    }
}
