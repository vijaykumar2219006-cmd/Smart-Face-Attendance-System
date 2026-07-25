# from modules.recognize_face import recognize_face

# recognize_face()
# from modules.register_student import register_student

# student_name = input("Enter Student Name: ")

# register_student(student_name)
from modules.register_student import register_student
from modules.train_model import train_model
from modules.recognize_face import recognize_face

print("\n===== Smart Face Attendance System =====")
print("1. Register Student")
print("2. Train Model")
print("3. Recognize Face")

choice = input("\nEnter your choice: ")

if choice == "1":
    student_name = input("Enter Student Name: ")
    register_student(student_name)

elif choice == "2":
    train_model()

elif choice == "3":
    recognize_face()

else:
    print("Invalid choice!")