
const DeleteModal = ({id, setActiveComment, handleDelete, type, parentId}) => {
    return ( 
        <div className="modal-container">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Delete comment</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                </div>
                <div className="modal-footer">
                    <button 
                        className="cancel-delete"
                        aria-label="Cancel delete."
                        onClick={()=> setActiveComment(null)}>
                            No, cancel
                    </button>
                    <button 
                        className="confirm-delete"
                        aria-label="Confirm delete."
                        onClick={()=>handleDelete(id, type, parentId)}>
                            Yes, delete
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default DeleteModal;