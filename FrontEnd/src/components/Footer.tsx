

export default function Footer() {
  return (
    <footer className="p-6 bg-gray-100 text-center dark:bg-gray-800 shadow-md">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  )
}
