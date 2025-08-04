import AddBookForm from "../components/AddBookForm"

export default function AddBookPage() {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">Add New Book</h1>
      <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md">
        <AddBookForm />
      </div>
    </div>
  )
}
