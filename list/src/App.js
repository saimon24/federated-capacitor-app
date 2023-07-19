import './index.css';

// document.getElementById("app").innerHTML = `
// <div class="container">
//   <div>I could be a list!</div>
// </div>
// `;

export default (el) => {
  el.innerHTML = `
  <div class="container">
    <h3>List</h3>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
  `;
};
