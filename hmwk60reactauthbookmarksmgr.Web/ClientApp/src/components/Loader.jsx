
export default function Loader(){
    return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}