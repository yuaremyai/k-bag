import cl from './MyModal.module.css'

function MyModal({children, visible, setVisible}){

    const rootClass = [cl.modal]

    if(visible){
        rootClass.push(cl.active)
    }

    return(
        <div className={rootClass.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.modal_content} onClick={e => e.stopPropagation()}>{children}</div>
        </div>
    )
}

export default MyModal