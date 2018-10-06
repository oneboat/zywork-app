import axios from '@/libs/api.request'

/**
 * 根据指定的modal名打开模态框
 * @param self this
 * @param modal modal名
 */
export const showModal = (self, modal) => {
  self.modal[modal] = true
}

/**
 * 根据指定的modal名关闭模态框
 * @param self this
 * @param modal modal名
 */
export const cancelModal = (self, modal) => {
  self.modal[modal] = false
}

/**
 * 重置表单
 * @param self this
 * @param formRef form ref名称
 */
export const resetForm = (self, formRef) => {
  self.$refs[formRef].resetFields();
}

/**
 * 清空formData数据
 * @param self
 * @param formData
 */
export const clearForm = (self, formData) => {
  self[formData] = {}
}

/**
 * 根据form数据对象添加数据
 * @param self this
 */
export const add = (self) => {
  self.$refs['addForm'].validate(valid => {
    if (valid) {
      axios.request({
        url: self.urls.addUrl,
        method: 'POST',
        data: self.form
      }).then(response => {
          if (response.data.code === 200) {
            self.$Message.success(response.data.message);
            resetForm(self, 'addForm')
            cancelModal(self, 'add')
            search(self)
          }
        }
      ).catch(error => {
        console.log(error)
        self.$Message.error('添加数据失败，稍候再试')
      })
    }
  })
}

/**
 * 根据form数据对象修改数据
 * @param self this
 */
export const edit = (self) => {
  self.$refs['editForm'].validate(valid => {
    if (valid) {
      axios.request({
        url: self.urls.editUrl,
        method: 'POST',
        data: self.form
      }).then(response => {
          if (response.data.code === 200) {
            self.$Message.success(response.data.message);
            resetForm(self, 'editForm')
            cancelModal(self, 'edit')
            search(self)
          }
        }
      ).catch(error => {
        console.log(error)
        self.$Message.error('修改数据失败，稍候再试')
      })
    }
  })
}

/**
 * 根据id删除数据
 * @param self this
 * @param row 需要删除的数据对象
 */
export const remove = (self, row) => {
  self.$Modal.confirm({
    title: '确认删除吗？',
    content: '确认删除选择的数据吗？',
    onOk: () => {
      axios.request({
        url: self.urls.removeUrl + row.id,
        method: 'GET'
      }).then(response => {
        if (response.data.code === 200) {
          self.$Message.success(response.data.message)
          search(self)
        }
      }).catch(error => {
        console.log(error)
        self.$Message.error('删除数据失败，稍候再试')
      })
    },
    onCancel: () => {

    }
  })
}

/**
 * 根据所选择的数据批量删除
 * @param self this
 */
export const batchRemove = (self) => {
  if (self.table.selections.length === 0) {
    self.$Message.warning('请选择需要批量删除的数据')
  } else {
    self.$Modal.confirm({
      title: '确认删除吗？',
      content: '确认批量删除选择的数据吗？',
      onOk: () => {
        let ids = []
        self.table.selections.forEach((row, index) => {
          ids.push(row.id)
        })
        axios.request({
          url: self.urls.batchRemoveUrl,
          method: 'POST',
          data: ids
        }).then(response => {
          if (response.data.code === 200) {
            self.$Message.success(response.data.message)
            self.table.selections = []
            search(self)
          }
        }).catch(error => {
          console.log(error)
          self.$Message.error('批量删除数据失败，稍候再试')
        })
      },
      onCancel: () => {

      }
    })
  }
}

/**
 * 激活或冻结数据
 * @param self this
 * @param row 需要激活或冻结的数据对象
 */
export const active = (self, row) => {
  let isActive = row.isActive === 0 ? 1 : 0
  axios.request({
    url: self.urls.editUrl,
    method: 'POST',
    data: {
      id: row.id,
      isActive: isActive
    }
  }).then(response => {
    if (response.data.code === 200) {
      self.$Message.success(response.data.message)
      search(self)
    }
  }).catch(error => {
    console.log(error)
    self.$Message.error('激活或冻结数据失败，稍候再试')

  })
}

/**
 * 根据所选的项，批量激活或冻结数据
 * @param self this
 * @param isActive 0表示需要激活，1表示需要冻结
 */
export const batchActive = (self, isActive) => {
  let rowArray = []
  if (self.table.selections.length === 0) {
    self.$Message.warning('请选择需要批量' + (isActive === 0 ? '激活' : '冻结') + '的数据')
  } else {
    self.table.selections.forEach((row, index) => {
      if (row.isActive !== isActive) {
        rowArray.push({
          id: row.id,
          isActive: isActive
        })
      }
    })
    if (rowArray.length > 0) {
      axios.request({
        url: self.urls.batchEditUrl,
        method: 'POST',
        data: rowArray
      }).then(response => {
        if (response.data.code === 200) {
          self.$Message.success(response.data.message)
          self.table.selections = []
          search(self)
        }
      }).catch(error => {
        console.log(error)
        self.$Message.error('批量激活或冻结数据失败，稍候再试')
      })
    }
  }
}

/**
 * 根据searchForm分页搜索
 * @param self this
 */
export const search = (self) => {
  self.table.loading = true
  axios.request({
    url: self.urls.searchUrl,
    method: 'POST',
    data: self.searchForm
  }).then(response => {
      self.table.loading = false
      self.page.total = response.data.data.total
      self.table.tableDetails = response.data.data.rows
    }
  ).catch(error => {
    self.table.loading = false
    self.$Message.error('加载数据失败，稍候再试')
  })
}

/**
 * table表格选中事件处理，记录所有被选中的项
 * @param self this
 * @param selections 事件返回值
 */
export const changeSelections = (self, selections) => {
  self.table.selections = selections
}

/**
 * table表格排序事件处理
 * @param self this
 * @param sortColumn 排序字段信息
 */
export const changeSort = (self, sortColumn) => {
  self.searchForm.sortColumn = sortColumn.key
  self.searchForm.sortOrder = sortColumn.order
  search(self)
}

/**
 * 分页组件页码改变事件处理
 * @param self this
 * @param pageNo 修改后的页码
 */
export const changePageNo = (self, pageNo) => {
  self.searchForm.pageNo = pageNo
  search(self)
}

/**
 * 分页组件每页大小改变事件处理
 * @param self this
 * @param pageSize 修改后的每页大小
 */
export const changePageSize = (self, pageSize) => {
  self.searchForm.pageSize = pageSize
  search(self)
}
