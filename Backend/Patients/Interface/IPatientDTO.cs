namespace PatientManagement.Interface
{
    public interface IPatientDTO<T>
    {
        public Task<ICollection<T>> Get();
        public Task<T> UpdateDto(T item, int id);
    }
}
