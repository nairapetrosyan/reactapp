'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _todos = require('../models/todos');

var _todos2 = _interopRequireDefault(_todos);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddTodo = function (_React$Component) {
  _inherits(AddTodo, _React$Component);

  function AddTodo(props) {
    _classCallCheck(this, AddTodo);

    var _this = _possibleConstructorReturn(this, (AddTodo.__proto__ || Object.getPrototypeOf(AddTodo)).call(this, props));

    _this.componentDidMount = function () {
      return fetch('/api/todos').then(function (res) {
        return res.json();
      }).then(function (items) {
        _this.setState({ items: items });
      });
    };

    _this.addItem = function (event) {
      event.preventDefault();
      return fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          todo: _this._inputElement.value,
          _id: Date.now()
        }),
        headers: { "Content-Type": "application/json" }
      }).then(function (res) {
        return res.json();
      }).then(function (items) {
        _this.setState = { items: items };
      });
    };

    _this.deleteItem = function (_id) {
      /*var filteredItems = this.state.items.filter(function (item) {
        return (item._id !== _id);
      });
      this.setState({
        items: filteredItems
      });*/
      fetch('/api/todos/' + _id, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (items) {
        _this.setState = { items: items };
      });
    };

    _this.editItem = function (_id) {
      /*const it = this.state.items.filter((item)=> {
        return (item.key === key);
      })[0];
      this._inputElement.value=it.todo;
      const updatedItems = this.state.items.map(item=>{
        if(item._id === key)
          item.todo =  this._inputElement.value;
        return item;
      });*/

      event.preventDefault();
      return fetch('/api/todos/' + _id, {
        method: 'PUT',
        body: JSON.stringify({
          todo: _this._inputElement.value,
          _id: _id
        }),
        headers: { "Content-Type": "application/json" }
      }).then(function (res) {
        return res.json();
      }).then(function (items) {
        _this.setState = { items: items };
      });
    };

    _this.state = {
      items: []
    };

    return _this;
  }

  _createClass(AddTodo, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'addtodo' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.addItem },
          _react2.default.createElement('input', { placeholder: 'enter task', ref: function ref(a) {
              return _this2._inputElement = a;
            } }),
          _react2.default.createElement(
            'button',
            { type: 'submit' },
            'add'
          )
        ),
        _react2.default.createElement(_List2.default, { todos: this.state.items, 'delete': this.deleteItem, edit: this.editItem })
      );
    }
  }]);

  return AddTodo;
}(_react2.default.Component);

;

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(Addtodo, null)
), document.getElementById('app'));