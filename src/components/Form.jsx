import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            maxCharacterTitle: 50,
            maxCharacterBody: 500,
        }

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onTitleChangeHandler(event) {
        const text = event.target.value;

        if (text.length <= this.state.maxCharacterTitle) {
            this.setState(() => {
                return {
                    title: event.target.value
                }
            });
        }

    }

    onBodyChangeHandler(event) {
        const text = event.target.value;

        if (text.length <= this.state.maxCharacterBody) {
            this.setState(() => {
                return {
                    body: event.target.value
                }
            });
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
        this.setState(() => {
            return {
                title: '',
                body: ''
            }
        })
    }

    render() {
        return (<div className={'px-96 text-white my-10'}>
            <h1 className={'text-4xl font-semibold'}>Buat Catatan</h1>
            <form className={'my-5'} onSubmit={this.onSubmitHandler}>
                <p className={'w-full text-right'}>Sisa
                    karakter: {this.state.maxCharacterTitle - this.state.title.length}</p>
                <input type={'text'} className={'form-control w-full mb-5'} placeholder={'Ini adalah judul ...'}
                       value={this.state.title} onChange={this.onTitleChangeHandler}/>
                <p className={'w-full text-right'}>Sisa
                    karakter: {this.state.maxCharacterBody - this.state.body.length}</p>
                <textarea className={'form-control w-full mb-5'} placeholder={'Tuliskan catatanmu di sini ...'}
                          rows={10} onChange={this.onBodyChangeHandler} value={this.state.body}></textarea>
                <button
                    className={'bg-transparent border-white border-[1px] rounded-md w-full py-3 font-bold text-xl'}
                    type={'submit'}>Buat
                </button>
            </form>
        </div>);
    }
}

export default Form;