import './modal.css';

const Modal = ({ handleClose, show, children,width,height }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} >
      <section className="modal-main">
      <header class="w3-container w3-red w3-display-container"> 
      <span onClick={handleClose} class="w3-button w3-xlarge w3-display-topright w3-hover-red w3-hover-opacity">×</span>
      <h2>Modal Header</h2>
    </header>
        {children}
        {/* <button type="button" onClick={handleClose}>
          Close
        </button> */}
        <footer class="w3-container w3-red">
      <p>Modal Footer</p>
    </footer>
      </section>
    </div>
  );
};
export default Modal;