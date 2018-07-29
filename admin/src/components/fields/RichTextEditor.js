import React, { Component } from 'react';
import Html from 'slate-html-serializer';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';

const BLOCK_TAGS = {
  p: 'paragraph',
  pre: 'code',
  blockquote: 'block-quote',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  ol: 'numbered-list',
  ul: 'bulleted-list',
  li: 'list-item'
};

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underlined',
  code: 'code'
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class')
          },
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      // if (obj.object == 'block') {
      switch (obj.type) {
        case 'code':
          return (
            <pre>
              <code>{children}</code>
            </pre>
          );
        case 'paragraph':
          return <p className={obj.data.get('className')}>{children}</p>;
        case 'block-quote':
          return <blockquote>{children}</blockquote>;
        case 'heading-one':
          return <h1>{children}</h1>;
        case 'heading-two':
          return <h2>{children}</h2>;
        case 'heading-three':
          return <h3>{children}</h3>;
        case 'numbered-list':
          return <ol>{children}</ol>;
        case 'bulleted-list':
          return <ul>{children}</ul>;
        case 'list-item':
          return <li>{children}</li>;
      }
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underline':
            return <u>{children}</u>;
          case 'code':
            return <code>{children}</code>;
        }
      }
    }
  }
];

/**
 * Create a new HTML serializer with `RULES`.
 *
 * @type {Html}
 */
const html = new Html({ rules });

/**
 * Define the default node type.
 *
 * @type {string}
 */
const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */
const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

/**
 * Rich Text Editor
 */
class RichTextEditor extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = { value: html.deserialize(props.value) };
  }

  /**
   * Check if the current selection has a mark with
   * `type` in it.
   *
   * @param {string} type
   * @return {boolean}
   */
  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  };

  /**
   * Check if the any of the currently selected
   * blocks are of `type`.
   *
   * @param {string} type
   * @return {boolean}
   */
  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type);
  };

  /**
   * Update editor state and value within
   * wrapping form.
   *
   * Before updating in wrapping form's value,
   * convert the slate state back to HTML.
   *
   * @param {Change} change
   */
  onChange = ({ value }) => {
    this.setState({ value });
    this.props.onChange(this.props.name, html.serialize(value));
  };

  /**
   * On key down, if it's a formatting command
   * toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */
  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);

    return true;
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {string} type
   */
  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {string} type
   */
  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        change.setBlocks('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {string} type
   * @param {string} icon
   * @return {Element}
   */
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = event => this.onClickMark(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {string} type
   * @param {string} icon
   * @return {Element}
   */
  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state;
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock('list-item') && parent && parent.type === type;
    }

    const onMouseDown = event => this.onClickBlock(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  };

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */
  renderNode = props => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */
  renderMark = props => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
    }
  };

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */
  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('heading-three', 'looks_3')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </div>
    );
  };

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */
  renderEditor = () => {
    const { placeholder } = this.props;
    return (
      <div className="editor">
        <Editor
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          spellCheck
          autoFocus
        />
      </div>
    );
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { title, help, isRequired } = this.props;

    return (
      <div className="rich-text-editor">
        {title && (
          <label>
            {title}
            {isRequired && <span className="required">*</span>}
          </label>
        )}
        <div className="wrap">
          {this.renderToolbar()}
          {this.renderEditor()}
        </div>
        {help && <span className="help-text">{help}</span>}
      </div>
    );
  }
}

export default RichTextEditor;
