import { useForm, SubmitHandler } from "react-hook-form";
import "./style.css";

type Inputs = {
  firstName: string;
  lastName: string;
  nickName: string;
  age: number;
  gender: string;
  email: string;
  tel: number;
};

export default function App() {
  /* useFormから関数をimport */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange", criteriaMode: "all" });

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log("onSubmit:", data);

  return (
    /* handleSubmitはフォームの入力内容を検証したうえで、引数に渡した関数(onSubmit)を実行 */
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>名前</label>
      <input {...register("firstName", { required: true, maxLength: 15 })} />
      {errors.firstName?.type === "required" && <p>名は入力必須です</p>}
      {errors.firstName?.type === "maxLength" && (
        <p>15文字以内で入力してください</p>
      )}
      <label>姓</label>
      <input {...register("lastName", { required: true, maxLength: 15 })} />
      {errors.lastName?.type === "required" && <p>名は入力必須です</p>}
      {errors.lastName?.type === "maxLength" && (
        <p>15文字以内で入力してください</p>
      )}
      <label>ニックネーム</label>
      <input {...register("nickName", { maxLength: 15 })} />
      {errors.nickName && <p>15文字以内で入力してください</p>}
      <label>年齢</label>
      <input
        {...register("age", {
          pattern: /^[0-9]+$/,
        })}
      />
      {errors.age && (
        <p>
          半角数字で入力してください。余計なスペースが入っていないかも確認してください。
        </p>
      )}
      <label>性別</label>
      <select {...register("gender", { required: true })}>
        <option value="">選択してください</option>
        <option value="man">男性</option>
        <option value="woman">女性</option>
        <option value="other">その他</option>
      </select>
      {errors.gender && <p>必須選択です</p>}
      <label>メールアドレス</label>
      <input
        {...register("email", {
          required: true,
          pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)/,
        })}
      />
      {errors.email?.type === "required" && <p>メールアドレスは必須です</p>}
      {errors.email?.type === "pattern" && (
        <p>正しいメールアドレスの形式で入力してください</p>
      )}
      <label>電話番号</label>
      <input
        {...register("tel", {
          required: true,
          pattern: /^0\d{9,10}$/,
        })}
      />
      {errors.tel?.type === "required" && <p>電話番号は必須です</p>}
      {errors.tel?.type === "pattern" && (
        <p>電話番号の形式（ハイフンなし）で入力してください</p>
      )}
      <input type="submit" />
    </form>
  );
}
