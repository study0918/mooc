let originTableData = res.plFileApplyResultAmtOutputDtoList;
          this.catalogTableData = originTableData.map((item) => {
            let a = item.plCancelArchiveFileOutputDtoList.map((list) => {
              return {
                ...list,
                checked222: false,
              };
            });
            item.plCancelArchiveFileOutputDtoList = a;
            return {
              ...item,
              collapse222: false,
              checked222: false,
            };
          });
          console.log("catalogTableData", this.catalogTableData);
