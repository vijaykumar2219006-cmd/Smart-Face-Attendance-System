from modules.register_student import register_student
from modules.train_model import train_model
from modules.recognize_face import recognize_face
from modules.attendance import mark_attendance

print("\n===== Smart Face Attendance System =====")
print("1. Register Student")
print("2. Train Model")
print("3. Recognize Face")
print("4. Mark Attendance")

choice = input("\nEnter your choice: ")

if choice == "1":
    student_name = input("Enter Student Name: ")
    name = input("Enter Student Name: ")
    register_student(name)

elif choice == "2":
    train_model()

elif choice == "3":
    recognize_face()

elif choice == "4":
    mark_attendance()

else:
    print("Invalid Choice!")