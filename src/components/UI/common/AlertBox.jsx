import React, { useState } from 'react'

export default function AlertBox({isVisible, setIsVisible,msg,functionExec}) {

    const showAlert = () => setIsVisible(true)
    const hideAlert = () => setIsVisible(false)

    return (
        <>
            {isVisible && (
                <div 
                    className="alert-backdrop"
                    onClick={hideAlert}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                >
                    <div 
                        className="alert-box"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            maxWidth: '400px',
                            width: '90%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <p>{msg}</p>
                        <div>
                            <button className="btn btn-sm btn-warning px-4" onClick={functionExec}>Yes</button>
                            <button className="btn btn-sm btn-soft px-4" onClick={hideAlert}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
