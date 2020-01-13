// eslint-disable-next-line no-unused-vars
(function () {
  class Ajax {
    constructor(option) {
      this.setting = $.extend({
        baseUrl: '',
        sucHook: () => {},
        errHook: () => {},
        beforeHook: () => {}
      }, option);
    }

    init(option) {
      this.setting = $.extend(this.setting, option);
    }

    urlVerify(url) {
      if (url.indexOf('http') === 0) {
        return url;
      }

      return this.setting.baseUrl + url;
    }

    get(url, op) {
      this.setting.beforeHook(url, op);

      let _url = this.urlVerify(url);

      if (op) {
        _url = _url + `?${this.parseParam(op, null)}`;
      }

      let sucHook = this.setting.sucHook;
      let errHook = this.setting.errHook;
      return new Promise((resolve, reject) => {
        $.ajax({
          url: _url,
          type: 'get',
          dataType: 'json',
          success: function (res) {
            if (res.data_status === false) {
              errHook(_url, res.error);
              reject(res.error);
              return;
            }

            sucHook(_url, res);
            resolve(res);
          },
          error: function (err) {
            errHook(_url, err);
            reject(err);
          }
        });
      });
    }

    post(url, param) {
      this.setting.beforeHook(url, param);

      let _url = this.urlVerify(url);

      let sucHook = this.setting.sucHook;
      let errHook = this.setting.errHook;
      return new Promise((resolve, reject) => {
        $.ajax({
          type: 'POST',
          url: _url,
          data: JSON.stringify(param),
          dataType: 'json',
          contentType: 'application/json;charset=UTF-8',
          success: function (res) {
            if (res.data_status === false) {
              errHook(_url, res.error);
              reject(res.error);
              return;
            }

            sucHook(_url, res);
            resolve(res);
          },
          error: function (err) {
            errHook(_url, {
              code: err.status,
              rawMessage: err.statusText
            });
            reject(err);
          }
        });
      });
    }

    delete(url, op) {
      this.setting.beforeHook(url, op);

      let _url = this.urlVerify(url);

      if (op) {
        _url = _url + `?${this.parseParam(op, null)}`;
      }

      let sucHook = this.setting.sucHook;
      let errHook = this.setting.errHook;
      return new Promise((resolve, reject) => {
        $.ajax({
          type: 'delete',
          url: _url,
          dataType: 'json',
          success: function (res) {
            if (res.data_status === false) {
              errHook(_url, res.error);
              reject(res.error);
              return;
            }

            sucHook(_url, res);
            resolve(res);
          },
          error: function (err) {
            errHook(_url, err);
            reject(err);
          }
        });
      });
    }

    uploading(url, param) {
      this.setting.beforeHook(url, param);

      let _url = this.urlVerify(url);

      let sucHook = this.setting.sucHook;
      let errHook = this.setting.errHook;
      return new Promise((resolve, reject) => {
        $.ajax({
          type: 'POST',
          url: _url,
          data: param,
          dataType: 'json',
          processData: false,
          contentType: false,
          success: function (res) {
            if (res.data_status === false) {
              errHook(_url, res.error);
              reject(res.error);
              return;
            }

            sucHook(_url, res);
            resolve(res);
          },
          error: function (err) {
            errHook(_url, err);
            reject(err);
          }
        });
      });
    }

    parseParam(param, key) {
      let paramStr = '';

      if (typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean') {
        paramStr += '&' + key + '=' + encodeURIComponent(param);
      } else if (param === null) {
        paramStr += '&' + key + '=';
      } else if (param.length) {
        $.each(param, (i, val) => {
          paramStr += '&' + key + '=' + encodeURIComponent(val);
        });
      } else {
        $.each(param, (i, val) => {
          let k = key === null ? i : key + ('.' + i);
          paramStr += '&' + this.parseParam(val, k);
        });
      }

      return paramStr.substr(1);
    }

  }

  window.Ajax = Ajax;
  window.ajax = new Ajax();
})(window, jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguZXM2Il0sIm5hbWVzIjpbIkFqYXgiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbiIsInNldHRpbmciLCIkIiwiZXh0ZW5kIiwiYmFzZVVybCIsInN1Y0hvb2siLCJlcnJIb29rIiwiYmVmb3JlSG9vayIsImluaXQiLCJ1cmxWZXJpZnkiLCJ1cmwiLCJpbmRleE9mIiwiZ2V0Iiwib3AiLCJfdXJsIiwicGFyc2VQYXJhbSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYWpheCIsInR5cGUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJkYXRhX3N0YXR1cyIsImVycm9yIiwiZXJyIiwicG9zdCIsInBhcmFtIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsImNvZGUiLCJzdGF0dXMiLCJyYXdNZXNzYWdlIiwic3RhdHVzVGV4dCIsImRlbGV0ZSIsInVwbG9hZGluZyIsInByb2Nlc3NEYXRhIiwia2V5IiwicGFyYW1TdHIiLCJlbmNvZGVVUklDb21wb25lbnQiLCJsZW5ndGgiLCJlYWNoIiwiaSIsInZhbCIsImsiLCJzdWJzdHIiLCJ3aW5kb3ciLCJqUXVlcnkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsQ0FBQyxZQUFXO0FBQ1IsUUFBTUEsSUFBTixDQUFXO0FBQ1BDLElBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTO0FBQ2hCLFdBQUtDLE9BQUwsR0FBZUMsQ0FBQyxDQUFDQyxNQUFGLENBQ1g7QUFDSUMsUUFBQUEsT0FBTyxFQUFFLEVBRGI7QUFFSUMsUUFBQUEsT0FBTyxFQUFFLE1BQU0sQ0FBRSxDQUZyQjtBQUdJQyxRQUFBQSxPQUFPLEVBQUUsTUFBTSxDQUFFLENBSHJCO0FBSUlDLFFBQUFBLFVBQVUsRUFBRSxNQUFNLENBQUU7QUFKeEIsT0FEVyxFQU9YUCxNQVBXLENBQWY7QUFTSDs7QUFFRFEsSUFBQUEsSUFBSSxDQUFDUixNQUFELEVBQVM7QUFDVCxXQUFLQyxPQUFMLEdBQWVDLENBQUMsQ0FBQ0MsTUFB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YyxDQUFDaUIsQ0FBRCxFQUFJQyxHQUFKLEtBQVk7QUFDdEJMLFVBQUFBLFFBQVEsSUFBSSxNQUFNRCxHQUFOLEdBQVksR0FBWixHQUFrQkUsa0JBQWtCLENBQUNJLEdBQUQsQ0FBaEQ7QUFDSCxTQUZEO0FBR0gsT0FKTSxNQUlBO0FBQ0g1QyxRQUFBQSxDQUFDLENBQUMwQyxJQUFGLENBQU9oQixLQUFQLEVBQWMsQ0FBQ2lCLENBQUQsRUFBSUMsR0FBSixLQUFZO0FBQ3RCLGNBQUlDLENBQUMsR0FBR1AsR0FBRyxLQUFLLElBQVIsR0FBZUssQ0FBZixHQUFtQkwsR0FBRyxJQUFJLE1BQU1LLENBQVYsQ0FBOUI7QUFDQUosVUFBQUEsUUFBUSxJQUFJLE1BQU0sS0FBSzFCLFVBQUwsQ0FBZ0IrQixHQUFoQixFQUFxQkMsQ0FBckIsQ0FBbEI7QUFDSCxTQUhEO0FBSUg7O0FBQ0QsYUFBT04sUUFBUSxDQUFDTyxNQUFULENBQWdCLENBQWhCLENBQVA7QUFDSDs7QUFyS007O0FBd0tYQyxFQUFBQSxNQUFNLENBQUNuRCxJQUFQLEdBQWNBLElBQWQ7QUFDQW1ELEVBQUFBLE1BQU0sQ0FBQzlCLElBQVAsR0FBYyxJQUFJckIsSUFBSixFQUFkO0FBQ0gsQ0EzS0QsRUEyS0dtRCxNQTNLSCxFQTJLV0MsTUEzS1giLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbihmdW5jdGlvbigpIHtcbiAgICBjbGFzcyBBamF4IHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmcgPSAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VVcmw6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdWNIb29rOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICAgICAgZXJySG9vazogKCkgPT4ge30sXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZUhvb2s6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0KG9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5nID0gJC5leHRlbmQodGhpcy5zZXR0aW5nLCBvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsVmVyaWZ5KHVybCkge1xuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKCdodHRwJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZy5iYXNlVXJsICsgdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KHVybCwgb3ApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZy5iZWZvcmVIb29rKHVybCwgb3ApO1xuICAgICAgICAgICAgbGV0IF91cmwgPSB0aGlzLnVybFZlcmlmeSh1cmwpO1xuICAgICAgICAgICAgaWYgKG9wKSB7XG4gICAgICAgICAgICAgICAgX3VybCA9IF91cmwgKyBgPyR7dGhpcy5wYXJzZVBhcmFtKG9wLCBudWxsKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHN1Y0hvb2sgPSB0aGlzLnNldHRpbmcuc3VjSG9vaztcbiAgICAgICAgICAgIGxldCBlcnJIb29rID0gdGhpcy5zZXR0aW5nLmVyckhvb2s7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogX3VybCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhX3N0YXR1cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJIb29rKF91cmwsIHJlcy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjSG9vayhfdXJsLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJIb29rKF91cmwsIGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwb3N0KHVybCwgcGFyYW0pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZy5iZWZvcmVIb29rKHVybCwgcGFyYW0pO1xuICAgICAgICAgICAgbGV0IF91cmwgPSB0aGlzLnVybFZlcmlmeSh1cmwpO1xuICAgICAgICAgICAgbGV0IHN1Y0hvb2sgPSB0aGlzLnNldHRpbmcuc3VjSG9vaztcbiAgICAgICAgICAgIGxldCBlcnJIb29rID0gdGhpcy5zZXR0aW5nLmVyckhvb2s7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBfdXJsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwYXJhbSksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGFfc3RhdHVzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyckhvb2soX3VybCwgcmVzLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNIb29rKF91cmwsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyckhvb2soX3VybCwgeyBjb2RlOiBlcnIuc3RhdHVzLCByYXdNZXNzYWdlOiBlcnIuc3RhdHVzVGV4dCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSh1cmwsIG9wKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmcuYmVmb3JlSG9vayh1cmwsIG9wKTtcbiAgICAgICAgICAgIGxldCBfdXJsID0gdGhpcy51cmxWZXJpZnkodXJsKTtcbiAgICAgICAgICAgIGlmIChvcCkge1xuICAgICAgICAgICAgICAgIF91cmwgPSBfdXJsICsgYD8ke3RoaXMucGFyc2VQYXJhbShvcCwgbnVsbCl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzdWNIb29rID0gdGhpcy5zZXR0aW5nLnN1Y0hvb2s7XG4gICAgICAgICAgICBsZXQgZXJySG9vayA9IHRoaXMuc2V0dGluZy5lcnJIb29rO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGVsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBfdXJsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YV9zdGF0dXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJySG9vayhfdXJsLCByZXMuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y0hvb2soX3VybCwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJySG9vayhfdXJsLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBsb2FkaW5nKHVybCwgcGFyYW0pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZy5iZWZvcmVIb29rKHVybCwgcGFyYW0pO1xuICAgICAgICAgICAgbGV0IF91cmwgPSB0aGlzLnVybFZlcmlmeSh1cmwpO1xuICAgICAgICAgICAgbGV0IHN1Y0hvb2sgPSB0aGlzLnNldHRpbmcuc3VjSG9vaztcbiAgICAgICAgICAgIGxldCBlcnJIb29rID0gdGhpcy5zZXR0aW5nLmVyckhvb2s7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBfdXJsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBwYXJhbSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhX3N0YXR1cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJIb29rKF91cmwsIHJlcy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjSG9vayhfdXJsLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJIb29rKF91cmwsIGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJzZVBhcmFtKHBhcmFtLCBrZXkpIHtcbiAgICAgICAgICAgIGxldCBwYXJhbVN0ciA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgICAgICAgIHR5cGVvZiBwYXJhbSA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgICAgICAgICB0eXBlb2YgcGFyYW0gPT09ICdib29sZWFuJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1TdHIgKz0gJyYnICsga2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJhbVN0ciArPSAnJicgKyBrZXkgKyAnPSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQuZWFjaChwYXJhbSwgKGksIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbVN0ciArPSAnJicgKyBrZXkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHBhcmFtLCAoaSwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrID0ga2V5ID09PSBudWxsID8gaSA6IGtleSArICgnLicgKyBpKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1TdHIgKz0gJyYnICsgdGhpcy5wYXJzZVBhcmFtKHZhbCwgayk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1TdHIuc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LkFqYXggPSBBamF4O1xuICAgIHdpbmRvdy5hamF4ID0gbmV3IEFqYXgoKTtcbn0pKHdpbmRvdywgalF1ZXJ5KTtcbiJdLCJmaWxlIjoiYWpheC5qcyJ9
