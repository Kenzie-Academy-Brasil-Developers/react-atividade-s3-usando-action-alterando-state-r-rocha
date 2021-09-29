import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../store/modules/user/actions";
import { useForm } from "react-hook-form";
import "./style.css"

const UserCard = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(changeName(data.name));
    }

    const name = useSelector((state) => state);

    return (
        <div className="container">
        <div className="result">{`User name: ${name.user.name}`}</div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name: </label>
            <input id="name" {...register('name', { required: true})} />
            <button type="submit">Change</button>
            <p className="errors">{errors.name && errors.name.type === "required" && <span>This is required</span>}</p>
            
        </form>
        </div>
    )

}

export default UserCard;