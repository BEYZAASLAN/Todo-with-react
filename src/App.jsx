import { useEffect, useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Todo } from './Todo';
import { collection, query, updateDoc, doc,addDoc,deleteDoc,onSnapshot} from 'firebase/firestore';
import { db } from './firebase';


const style = {
  bg: `h-screen w-screen bg-gradient-to-r from-[#f1f1f1] to-[#1CB5E0] flex justify-center items-center`,
  container: `bg-pink-100 mx-auto rounded-lg shadow-xl p-3 max-w-[600px] w-full`,
  heading: `text-3xl font-bold text-center text-pink-600 p-2`,
  form: `p-4 w-full text-xl`,
  button: `  ml-2 mb-1  bg-pink-100 rounded-lg text-pink-600 `,
  count: `text-center p-4`,
  input:`text-gray-400 p-3 mt-4  mb-2 rounded-xl `,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  /*   CRUD islemlerini yapcam simdi  */

  // Create-firebase
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
        alert("adamsan bos not girmezsin kardesimm😎👀🫣😜😵")
        return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
     setInput('')
  };

  // Read-firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach(doc => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    
    return () => unsubscribe();
  }, []);

  // Update-firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete-firebase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };
   

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>⚡ NOTLAR ⚡</h3>
        <form onSubmit={createTodo} className={style.form}>
          <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="not al aşkoo" />
            <button className={style.button}><FaPlusCircle size={30} /></button>
          </div>
        </form>
        <ul>
          {todos.map((todo, index) => {
            return <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />;
          })}
        </ul>
        <p className={style.count}>{`📒 ${todos.length} not ekledin 📒 `}</p>
      </div>
    </div>
  );
}

export default App;
